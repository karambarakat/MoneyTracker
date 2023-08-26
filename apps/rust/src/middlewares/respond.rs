use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    http::{header::AUTHORIZATION, StatusCode},
    web::{self},
    Error, HttpMessage, HttpRequest, HttpResponse, ResponseError,
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

use crate::errors::MyErrors as the_err;
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
        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;

            Ok(res)
        })
    }
}
