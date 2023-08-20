use actix_web::{
    error,
    http::{header::ContentType, StatusCode},
    HttpResponse, ResponseError,
};
use serde_json::{Number, Value};
use ts_rs::TS;

use std::fmt::Debug;
use thiserror::Error;

use serde::{Deserialize, Serialize};

pub trait ResponseErrorExt {
    fn json(&self) -> serde_json::Value {
        serde_json::json!({
            "status": 500,
            "code": "basic_token_required",
            "message": "internal error, please try again later",
            "info": null
        })
    }

    fn status_code(&self) -> StatusCode {
        self::StatusCode::INTERNAL_SERVER_ERROR
    }
}

#[derive(Debug, Error, Deserialize, Serialize, TS, derive_more::Display)]
#[ts(export)]
pub struct BasicTokenRequired {
    pub more_info: String,
}

impl ResponseErrorExt for BasicTokenRequired {
    fn status_code(&self) -> StatusCode {
        StatusCode::BAD_REQUEST
    }

    fn json(&self) -> Value {
        serde_json::json!({
            "status": 500,
            "code": "basic_token_required",
            "message": "internal error, please try again later",
            "info": {
                "more_info": self.more_info
            }
        })
    }
}

impl ResponseError for BasicTokenRequired {
    fn error_response(&self) -> HttpResponse {
        let body = self.json();

        HttpResponse::build(ResponseErrorExt::status_code(self))
            .insert_header(ContentType::json())
            .body(body.to_string())
    }

    fn status_code(&self) -> StatusCode {
        ResponseErrorExt::status_code(self)
    }
}

#[derive(Debug, derive_more::Display, Error)]
pub enum MyErrors {
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
        match *self {
            MyErrors::UnknownError => StatusCode::INTERNAL_SERVER_ERROR,
            MyErrors::ValidationError(_) => StatusCode::BAD_REQUEST,
        }
    }
}
