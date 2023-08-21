use actix_web::{post, web, HttpRequest, Responder, ResponseError};

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
    .bind("local,google")
    .fetch_one(&pool)
    .await;

    Ok(web::Json(res.unwrap()))
}

#[post("/login")]
pub async fn login(
    auth: Option<web::ReqData<EmailPassword>>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<impl Responder, MyErrors> {
    let pool = pool.into_inner().as_ref().clone();

    let auth = auth.ok_or(MyErrors::ValidationError(
        "email and password is required".to_string(),
    ))?;

    let auth = auth.into_inner();

    let res = sqlx::query_as::<_, User>(
        r#"
    SELECT id, email, display_name, avatar, providers, created_at, updated_at
    FROM users
    WHERE email = $1
    "#,
    )
    .bind(auth.email)
    .fetch_one(&pool)
    .await;

    let res = match res {
        Ok(res) => res,
        Err(err) => {
            if err
                .to_string()
                .contains("no rows returned by a query that expected to return at least one row")
            {
                return Err(MyErrors::EmailOrPasswordIncorrect);
            }
            println!("{}", err.to_string());
            return Err(MyErrors::UnknownError);
        }
    };

    Ok(web::Json(res))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(register).service(login);
}
