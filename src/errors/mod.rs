use actix_web::{
    http::{header::ContentType, StatusCode},
    HttpResponse, ResponseError,
};

use std::fmt::Debug;
use thiserror::Error;

#[derive(Debug, derive_more::Display, Error)]
pub enum MyErrors {
    #[display(fmt = "email or password is incorrect")]
    EmailOrPasswordIncorrect,
    #[display(fmt = "validation error: {0}", _0)]
    ValidationError(String),
    #[display(fmt = "internal error")]
    UnknownError,
}

impl ResponseError for MyErrors {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::html())
            .body(self.to_string())
    }

    fn status_code(&self) -> StatusCode {
        match self {
            MyErrors::UnknownError => StatusCode::INTERNAL_SERVER_ERROR,
            MyErrors::ValidationError(_) => StatusCode::BAD_REQUEST,
            MyErrors::EmailOrPasswordIncorrect => StatusCode::UNAUTHORIZED,
            error => {
                println!("{error}");
                StatusCode::INTERNAL_SERVER_ERROR
            }
        }
    }
}

pub mod basic_token_error {
    use actix_web::{
        http::{header::ContentType, StatusCode},
        HttpResponse, ResponseError,
    };
    use ts_rs::TS;

    use std::fmt::Debug;
    use thiserror::Error;

    use serde::{Deserialize, Serialize};

    #[derive(Debug, Error, Deserialize, Serialize, TS, derive_more::Display)]
    #[ts(export)]
    pub struct BasicTokenRequired {
        pub more_info: String,
    }

    impl ResponseError for BasicTokenRequired {
        fn error_response(&self) -> HttpResponse {
            let status = StatusCode::BAD_REQUEST;

            let code = "basic_token_required";

            let body = serde_json::json!({
                "status": status.as_u16(),
                "code": code,
                "message": "internal error, please try again later",
                "info": {
                    "more_info": self.more_info
                }
            });

            HttpResponse::build(status)
                .insert_header(ContentType::json())
                .body(body.to_string())
        }
    }
}
