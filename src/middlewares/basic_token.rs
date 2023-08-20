use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    http::header::AUTHORIZATION,
    web::{self},
    Error, HttpMessage,
};
use futures_util::future::LocalBoxFuture;
use std::{
    future::{ready, Ready},
    num::NonZeroU32,
};

use crate::errors::BasicTokenRequired as thisErr;

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

    fn call(&self, mut req: ServiceRequest) -> Self::Future {
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

#[derive(Default, Clone)]
pub struct EmailPassword {
    pub email: String,
    /// encrypted password
    pub password: [u8; ring::digest::SHA256_OUTPUT_LEN],
}

impl std::fmt::Display for EmailPassword {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "[User: {}, ****]", self.email)
    }
}

impl EmailPassword {
    pub fn new(email: String, password_: String) -> Self {
        let mut password = [0u8; ring::digest::SHA256_OUTPUT_LEN];

        Self::alg(&mut password, &password_);

        Self { email, password }
    }

    pub fn verify(&self, value: EmailPassword) -> bool {
        self.password == value.password && self.email == value.email
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

fn process_request(req: &ServiceRequest) -> Result<EmailPassword, thisErr> {
    let header = req
        .headers()
        .get(AUTHORIZATION)
        .ok_or(thisErr {
            more_info: "header is not provided".to_string(),
        })?
        .to_str()
        .map_err(|_| thisErr {
            more_info: "header is not provided".to_string(),
        })?;

    let (email, password) = {
        let auth = header.split(" ").collect::<Vec<&str>>();
        if auth.len() != 2 || auth[0] != "Basic" {
            return Err(thisErr {
                more_info: "not a basic token".to_string(),
            });
        }

        use base64::Engine;

        let auth = auth[1];
        let auth = base64::engine::general_purpose::STANDARD
            .decode(auth)
            .map_err(|_| thisErr {
                more_info: "token decoding failed".to_string(),
            })?;
        let auth = String::from_utf8(auth).map_err(|_| thisErr {
            more_info: "token decoding failed, input is valid?".to_string(),
        })?;
        let auth = auth.split(":").collect::<Vec<&str>>();
        if auth.len() != 2 {
            return Err(thisErr {
                more_info: "token is not formatted as email:password".to_string(),
            });
        }

        (auth[0].to_string(), auth[1].to_string())
    };

    Ok(EmailPassword::new(email, password))
}
