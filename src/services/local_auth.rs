use core::panic;
use std::cell::RefCell;
use std::rc::Rc;

use actix_web::{post, web, HttpRequest, Responder, ResponseError};
use sqlx::FromRow;

use crate::errors::MyErrors;
use crate::middlewares::basic_token::EmailPassword;
use crate::modules::user::{self, User};

mod user_body {
    use actix_web::{error, web};
    use futures::StreamExt;
    use serde_json::Value;

    #[derive(serde::Deserialize)]
    pub struct Info {
        pub display_name: Option<String>,
        pub avatar: Option<String>,
    }

    pub async fn extract(mut payload: web::Payload) -> anyhow::Result<Info> {
        const MAX_SIZE: usize = 262_144; // max payload size is 256k
        let mut body = web::BytesMut::new();
        while let Some(chunk) = payload.next().await {
            let chunk = chunk?;
            if (body.len() + chunk.len()) > MAX_SIZE {
                anyhow::bail!("overflow");
            }
            body.extend_from_slice(&chunk);
        }

        let body = serde_json::from_slice::<Info>(&body);

        match body {
            Err(err) => {
                if err.classify() == serde_json::error::Category::Data {
                    let stri = err.to_string();
                    // stri will end with ` at line 2 column 1` I want to remove that
                    let stri = stri.split(" at line ").collect::<Vec<&str>>()[0];

                    anyhow::bail!("data {stri}");
                }
                anyhow::bail!("json is invalid: {err}");
            }
            Ok(body) => return Ok(body),
        };
    }
}

#[post("/register")]
pub async fn register(
    user: web::ReqData<crate::middlewares::basic_token::EmailPassword>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
    body: web::Payload,
) -> Result<impl Responder, MyErrors> {
    let pool = pool.into_inner().as_ref().clone();

    let body: user_body::Info = user_body::extract(body)
        .await
        .map_err(|x| MyErrors::ValidationError(x.to_string()))?;

    let res = sqlx::query_as::<_, User>(
        r#"
    INSERT INTO users (email, password, display_name, avatar, providers)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, display_name, avatar, providers, created_at, updated_at;
    "#,
    )
    .bind(user.email.clone())
    .bind(user.password.clone())
    .bind(body.display_name.clone())
    .bind(body.avatar.clone())
    .bind("local")
    .fetch_one(&pool)
    .await;

    Ok(web::Json(res.unwrap()))
}

#[post("/login")]
pub async fn login(
    user: Option<web::ReqData<Rc<RefCell<Option<crate::middlewares::user::User>>>>>,
    auth: Option<web::ReqData<EmailPassword>>,
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
        _ => return Err(MyErrors::UnknownError),
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
                id: res.id.clone().into(),
                email: res.email.clone(),
                user_name: res.email.clone(),
            });
        }
        _ => {} // user is already attached
    };

    Ok(web::Json(res))

    // crate::middlewares::user::Middleware will populate token on header x-token
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(register).service(login);
}
