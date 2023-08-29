use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    http::header::AUTHORIZATION,
    web::{self},
    Error, HttpMessage,
};
use futures_util::future::LocalBoxFuture;
use std::{
    cell::RefCell,
    default,
    future::{ready, Ready},
    num::NonZeroU32,
    rc::Rc,
};
use ts_rs::TS;

use crate::errors::MyErrors;
use crate::utils::jwt::Jwt;
use chrono::{DateTime, Duration, Utc};

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
    type Transform = RuntimeMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(RuntimeMiddleware { service }))
    }
}

pub struct RuntimeMiddleware<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for RuntimeMiddleware<S>
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

        let user = req
            .extensions()
            .get::<crate::middlewares::user::ReqUser>()
            .unwrap()
            .clone();

        let mut user = user.borrow_mut();

        match user.as_ref() {
            None => {
                *user = Some(crate::middlewares::user::User {
                    id: credential.id.clone().into(),
                    email: credential.email.clone(),
                    user_name: credential.email.clone(),
                });
            }
            _ => {} // user is already attached
        };

        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;
            Ok(res)
        })
    }
}

fn process_request(req: &ServiceRequest) -> Result<Jwt, MyErrors> {
    let header = req
        .headers()
        .get(AUTHORIZATION)
        .ok_or(MyErrors::Frontend("no authorization header".to_string()))?
        .to_str()
        .map_err(|_| MyErrors::Frontend("invalid header".to_string()))?;

    let auth = header.split(" ").collect::<Vec<&str>>();
    if auth.len() != 2 || auth[0] != "Bearer" {
        return Err(MyErrors::Frontend("not a bearer token".to_string()));
    }

    Ok(Jwt::validate(auth[1])?)
}
