use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    http::header::AUTHORIZATION,
    Error, HttpMessage,
};
use futures_util::future::LocalBoxFuture;
use std::{
    future::{ready, Ready},
    num::NonZeroU32,
};

use crate::errors::MyErrors;

pub struct Middleware;

impl<S, B> Transform<S, ServiceRequest> for Middleware
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = RuntimeMid<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(RuntimeMid { service }))
    }
}

pub struct RuntimeMid<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for RuntimeMid<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let credential = process_request(&req);

        let credential = match credential {
            Ok(credential) => credential,
            Err(err) => return Box::pin(async { Err(err.into()) }),
        };

        req.extensions_mut().insert(credential);
        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;
            Ok(res)
        })
    }
}

#[derive(Default, Clone, ts_rs::TS)]
#[ts(export)]
pub struct BasicToken {
    pub email: String,
    /// encrypted password
    pub password: String,
}

impl std::fmt::Display for BasicToken {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "[User: {},****]", self.email)
    }
}
use base64::Engine;

impl BasicToken {
    pub fn new(email: String, password: String) -> Self {
        let mut _password = [0u8; ring::digest::SHA256_OUTPUT_LEN];

        Self::alg(&mut _password, &password);

        // convert to hex string
        let password = _password
            .iter()
            .map(|byte| format!("{:02x}", byte))
            .collect::<Vec<String>>()
            .join("");

        Self { email, password }
    }

    pub fn decode(token: &str) -> Result<Self, MyErrors> {
        let token = base64::engine::general_purpose::STANDARD
            .decode(token)
            .map_err(|_| MyErrors::BadRequest("token decoding failed".to_string()))?;
        let token = String::from_utf8(token).map_err(|_| {
            MyErrors::BadRequest("token decoding failed, input is valid?".to_string())
        })?;
        let token = token.split(":").collect::<Vec<&str>>();
        if token.len() != 2 {
            return Err(MyErrors::BadRequest(
                "token is not formatted as email:password".to_string(),
            ));
        }

        let (email, password) = (token[0].to_string(), token[1].to_string());

        Ok(Self::new(email, password))
    }

    pub fn verify(&self, db_value: &str) -> Result<(), anyhow::Error> {
        match db_value == self.password {
            true => Ok(()),
            false => Err(anyhow::anyhow!("password is incorrect")),
        }
    }

    fn alg(store: &mut [u8; ring::digest::SHA256_OUTPUT_LEN], password: &str) {
        let salt = std::env::var("SALT").expect("salt is not in env");

        ring::pbkdf2::derive(
            ring::pbkdf2::PBKDF2_HMAC_SHA256,
            NonZeroU32::new(100).unwrap(),
            &salt.as_bytes(),
            password.as_bytes(),
            store,
        );
    }
}

fn process_request(req: &ServiceRequest) -> Result<BasicToken, MyErrors> {
    let header = req
        .headers()
        .get(AUTHORIZATION)
        .ok_or(MyErrors::BadRequest("header is not provided".to_string()))?
        .to_str()
        .map_err(|_| MyErrors::BadRequest("header is not provided".to_string()))?;

    let auth = header.split(" ").collect::<Vec<&str>>();
    if auth.len() != 2 || auth[0] != "Basic" {
        return Err(MyErrors::BadRequest("not a basic token".to_string()));
    }

    Ok(BasicToken::decode(auth[1])?)
}
