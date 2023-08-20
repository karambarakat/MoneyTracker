use actix_web::*;
use async_graphql::{EmptySubscription, Schema};

mod graphql;
mod middlewares;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    let port = std::env::var("PORT")
        .unwrap_or("8080".to_string())
        .parse::<u16>()
        .expect("port is not a number");

    let pool = db::connect().await;

    HttpServer::new(move || {
        let schema = Schema::build(
            graphql::root::Query::default(),
            graphql::root::Mutation::default(),
            EmptySubscription,
        )
        .data(pool.clone())
        .finish();

        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(
                web::scope("/graphql")
                    .app_data(web::Data::new(schema))
                    .service(graphql::graphql_playground)
                    .service(graphql::graphql_endpoint),
            )
            .service(
                web::scope("/auth/local")
                    .wrap(middlewares::basic_token::Middleware)
                    .configure(services::local_auth::config),
            )
            .route(
                "/",
                web::get().to(|| async { HttpResponse::Ok().body("api is working") }),
            )
            .route("*", web::get().to(HttpResponse::NotFound))
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}

pub mod Error {
    use actix_web::{
        error, get,
        http::{header::ContentType, StatusCode},
        App, HttpResponse,
    };

    use std::fmt::{Debug, Display};
    use thiserror::Error;

    use serde::{Deserialize, Serialize};

    fn default_message() -> String {
        "internal error, please try again later".to_string()
    }

    #[derive(Deserialize, Serialize)]
    struct Info {
        more_info: Option<String>,
    }

    #[derive(Deserialize, Serialize)]
    struct MyRes {
        code: u16,
        key: String,
        message: String,
        info: Option<Info>,
    }
    use ts_rs::TS;

    #[derive(Debug, Error, Deserialize, Serialize, TS)]
    #[ts(export)]
    pub struct BasicTokenRequired {
        pub more_info: String,
    }

    impl BasicTokenRequired {
        fn get_key(&self) -> String {
            "basic_token_required".to_string()
        }
    }

    impl Display for BasicTokenRequired {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            write!(f, "{}", default_message())
        }
    }

    impl error::ResponseError for BasicTokenRequired {
        fn status_code(&self) -> StatusCode {
            StatusCode::BAD_REQUEST
        }

        fn error_response(&self) -> HttpResponse {
            let body = serde_json::to_string(&MyRes {
                code: self.status_code().as_u16(),
                key: self.get_key(),
                message: self.to_string(),
                info: Some(Info {
                    more_info: Some(self.more_info.to_string()),
                }),
            })
            .unwrap();

            HttpResponse::build(self.status_code())
                .insert_header(ContentType::json())
                .body(body)
        }
    }

    #[derive(Debug, Error)]
    pub enum MyError {
        #[error("internal error!")]
        InternalError,

        #[error("bad request")]
        BadClientData,
    }

    impl error::ResponseError for MyError {
        fn error_response(&self) -> HttpResponse {
            HttpResponse::build(self.status_code())
                .insert_header(ContentType::html())
                .body(self.to_string())
        }

        fn status_code(&self) -> StatusCode {
            match *self {
                MyError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
                MyError::BadClientData => StatusCode::BAD_REQUEST,
                _ => StatusCode::GATEWAY_TIMEOUT,
            }
        }
    }
}

mod db {
    use sqlx::postgres::PgPoolOptions;

    pub async fn connect() -> sqlx::PgPool {
        let db_connection = std::env::var("POSTGRES_DB").expect("no database url");

        let pool = PgPoolOptions::new()
            .max_connections(5)
            .connect(&db_connection)
            .await
            .expect("no database connection");

        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS users (
                id              SERIAL PRIMARY KEY,
                email           VARCHAR NOT NULL,
                password        VARCHAR NOT NULL,
                display_name    VARCHAR,
                avatar          VARCHAR,
                providers       VARCHAR NOT NULL,
                created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
            );"#,
        )
        .execute(&pool)
        .await
        .unwrap();

        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS category (
                id          SERIAL PRIMARY KEY,
                title       VARCHAR NOT NULL,
                color       VARCHAR,
                icon        VARCHAR,
                created_by  integer NOT NULL,
                created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                
                FOREIGN KEY (created_by) REFERENCES users(id)
            );"#,
        )
        .execute(&pool)
        .await
        .unwrap();

        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS category_temp (
                id              SERIAL PRIMARY KEY,
                title           VARCHAR NOT NULL,
                color           VARCHAR,
                icon            VARCHAR,
                created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
            );"#,
        )
        .execute(&pool)
        .await
        .unwrap();

        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS entry (
                id          SERIAL PRIMARY KEY,
                title       VARCHAR NOT NULL,
                amount      integer NOT NULL,
                category    integer,
                created_by  integer NOT NULL,
                note        VARCHAR,
                created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (category) REFERENCES category(id),
                FOREIGN KEY (created_by) REFERENCES users(id)
            );"#,
        )
        .execute(&pool)
        .await
        .unwrap();

        pool
    }
}
