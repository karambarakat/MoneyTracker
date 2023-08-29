use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    http::header::{HeaderName, HeaderValue, AUTHORIZATION},
    web::{self},
    Error, HttpMessage,
};
use futures_util::future::LocalBoxFuture;
use std::{
    cell::RefCell,
    future::{ready, Ready},
    num::NonZeroU32,
    rc::Rc,
    str::FromStr,
    sync::Arc,
};

use crate::errors::MyErrors;

use crate::utils::jwt::Jwt;

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
        let user: ReqUser = Rc::new(RefCell::new(None));

        req.extensions_mut().insert(user.clone());

        let fut = self.service.call(req);

        Box::pin(async move {
            let mut res = fut.await?;

            let user = user.borrow();

            let user = user.as_ref();

            if let Some(user) = user {
                // when user is available this means the user has been authenticated
                // if so attach new x-token header to the response
                // crate::services::local_auth::login
                // crate::services::local_auth::register
                // crate::middleware::bearer_token
                let header = HeaderName::from_str("X-token")
                    .map_err(|err| MyErrors::Backend(Box::new(err)))?;
                let jwt = Jwt::sign(&user.id, &user.email, &user.email)
                    .map_err(|err| MyErrors::Backend(Box::new(err)))?;
                let val =
                    HeaderValue::from_str(&jwt).map_err(|err| MyErrors::Backend(Box::new(err)))?;

                res.headers_mut().insert(header, val);
            }

            Ok(res)
        })
    }
}

#[derive(Debug, Clone)]
pub struct User {
    pub email: String,
    pub id: String,
    pub user_name: String,
}

pub type ReqUser = Rc<RefCell<Option<User>>>;
