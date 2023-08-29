use core::panic;
use std::cell::RefCell;
use std::rc::Rc;

use actix_web::{post, web, HttpRequest, Responder, ResponseError};
use sqlx::postgres::PgDatabaseError;
use sqlx::FromRow;

use crate::errors::MyErrors;
use crate::middlewares::basic_token::BasicToken;
use crate::modules::user::{self, User};

mod user_body {
    use actix_web::{error, web};
    use futures::StreamExt;
    use serde_json::Value;

    use crate::errors::MyErrors;

    #[derive(serde::Deserialize, ts_rs::TS)]
    #[ts(export)]
    pub struct RegisterUserBody {
        pub display_name: Option<String>,
        pub avatar: Option<String>,
    }

    pub async fn extract(mut payload: web::Payload) -> Result<RegisterUserBody, MyErrors> {
        const MAX_SIZE: usize = 262_144; // max payload size is 256k
        let mut body = web::BytesMut::new();
        while let Some(chunk) = payload.next().await {
            let chunk = chunk.map_err(|_| MyErrors::Frontend("payload error".to_string()))?;
            if (body.len() + chunk.len()) > MAX_SIZE {
                return Err(MyErrors::Frontend("overflow".to_string()));
            }
            body.extend_from_slice(&chunk);
        }

        let body = serde_json::from_slice::<RegisterUserBody>(&body);

        match body {
            Err(err) => {
                if err.classify() == serde_json::error::Category::Data {
                    let stri = err.to_string();
                    // stri will end with ` at line 2 column 1` I want to remove that
                    let stri = stri.split(" at line ").collect::<Vec<&str>>()[0];

                    return Err(MyErrors::ValidationError(stri.to_string()));
                }
                return Err(MyErrors::Frontend(format!("json is invalid {err}")));
            }
            Ok(body) => return Ok(body),
        };
    }
}

#[post("/register")]
pub async fn register(
    authenticate: Option<web::ReqData<crate::middlewares::user::ReqUser>>,
    basic_token: web::ReqData<crate::middlewares::basic_token::BasicToken>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
    body: web::Payload,
) -> Result<impl Responder, MyErrors> {
    let pool = pool.into_inner().as_ref().clone();

    // Todo: make this actix extractor instead of web::Payload
    let body: user_body::RegisterUserBody = user_body::extract(body).await?;

    let res = sqlx::query_as::<_, User>(
        r#"
    INSERT INTO users (email, password, display_name, avatar, providers)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, display_name, avatar, providers, created_at, updated_at;
    "#,
    )
    .bind(basic_token.email.clone())
    .bind(basic_token.password.clone())
    .bind(body.display_name.clone())
    .bind(body.avatar.clone())
    .bind("local")
    .fetch_one(&pool)
    .await;

    if let Err(sqlx::Error::Database(err)) = &res {
        if err.code() == Some("23505".into()) {
            return Err(MyErrors::EmailAlreadyExists(basic_token.email.clone()));
        }
    }

    let res = res.unwrap();

    // authenticate user
    let authenticate = authenticate
        .expect("app configured incorrectly")
        .into_inner();

    let mut authenticate = authenticate.borrow_mut();

    match authenticate.as_ref() {
        None => {
            *authenticate = Some(crate::middlewares::user::User {
                id: res.id.to_string().parse().unwrap(),
                email: res.email.clone(),
                user_name: res.email.clone(),
            });
        }
        _ => {} // user is already attached
    };

    Ok(web::Json(serde_json::json!({"data":res})))
}

#[post("/login")]
pub async fn login(
    user: Option<web::ReqData<crate::middlewares::user::ReqUser>>,
    auth: Option<web::ReqData<BasicToken>>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<impl Responder, MyErrors> {
    let pool = pool.into_inner().as_ref().clone();

    let auth = auth
        .expect(
            "app configured incorrectly, expected basic token middleware to populate EmailPassword",
        )
        .into_inner();

    let res = sqlx::query(
        r#"
    SELECT id, email, display_name, avatar, providers, created_at, updated_at, password
    FROM users
    WHERE email = $1
    "#,
    )
    .bind(&auth.email)
    .fetch_one(&pool)
    .await;

    let res = match res {
        Ok(res) => res,
        Err(sqlx::Error::RowNotFound) => return Err(MyErrors::EmailOrPasswordIncorrect),
        Err(err) => return Err(MyErrors::Backend(Box::new(err))),
    };

    use sqlx::Row;
    let password = res.try_get::<String, _>("password").unwrap();
    auth.verify(&password)
        .map_err(|_| MyErrors::EmailOrPasswordIncorrect)?;

    let res = User::from_row(&res).unwrap();

    // authenticate user
    let user = user.expect("app configured incorrectly").into_inner();

    let mut user = user.borrow_mut();

    match user.as_ref() {
        None => {
            *user = Some(crate::middlewares::user::User {
                id: res.id.to_string().parse().unwrap(),
                email: res.email.clone(),
                user_name: res.email.clone(),
            });
        }
        _ => {} // user is already attached
    };

    Ok(web::Json(serde_json::json!({"data":res})))

    // crate::middlewares::user::Middleware will populate token on header x-token
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(register).service(login);
}
