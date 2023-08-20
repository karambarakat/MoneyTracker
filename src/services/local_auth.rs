use actix_web::http::header::AUTHORIZATION;
use actix_web::{post, web, HttpRequest, HttpResponse, Responder, ResponseError};
use async_graphql::{EmptySubscription, Schema};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use crate::middlewares::basic_token::EmailPassword;
use crate::Error::MyError;

#[post("/register")]
pub async fn register(
    req: HttpRequest,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<impl Responder, crate::Error::BasicTokenRequired> {
    Ok("hello".to_string())
}

#[post("/login")]
pub async fn login(
    auth: Option<web::ReqData<EmailPassword>>,
    // basic_auth: web::Data<EmailPassword>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<impl Responder, MyError> {
    match auth {
        Some(auth) => {
            println!("{:?}", auth);
        }
        None => println!("no auth"),
    };

    Ok(format!("hello"))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(register).service(login);
}
