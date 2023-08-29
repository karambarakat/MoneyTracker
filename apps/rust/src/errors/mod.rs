use actix_web::{
    body::BoxBody,
    dev::Response,
    http::{header::ContentType, StatusCode},
    Handler, HttpRequest, HttpResponse, HttpResponseBuilder, Responder, ResponseError,
};
use serde_json::Number;

use std::fmt::Debug;
use thiserror::Error;

#[derive(Debug, derive_more::Display, Error, serde::Serialize, ts_rs::TS)]
#[ts(export)]
pub enum MyErrors {
    #[display(fmt = "EmailAlreadyExists: email already exists: {0}", _0)]
    EmailAlreadyExists(String),
    #[display(fmt = "EmailOrPasswordIncorrect: email or password is incorrect")]
    EmailOrPasswordIncorrect,
    #[display(fmt = "ValidationError: validation error: {0}", _0)]
    ValidationError(String),
    #[display(fmt = "NotFound: 404 not found")]
    NotFound,
    #[display(fmt = "ExpiredBearerToken: token expired")]
    ExpiredBearerToken,

    /// error that should not happened if my code is correct
    #[display(fmt = "internal error")]
    #[serde(skip)]
    Backend(Box<dyn std::error::Error>),

    /// error that is the frontend dev`s responsibility. With a non-user-facing error message
    #[display(fmt = "bad request")]
    #[serde(skip)]
    Frontend(String),
}

use convert_case::{Case, Casing};

impl Responder for MyErrors {
    type Body = BoxBody;
    fn respond_to(self, _: &HttpRequest) -> HttpResponse<Self::Body> {
        self.error_response()
    }
}

impl ResponseError for MyErrors {
    fn error_response(&self) -> HttpResponse {
        if let Self::Backend(reason) = self {
            println!("internal error: {:?}", reason);
        }

        let info = match self {
            Self::Frontend(reason) => {
                serde_json::json!({
                    "reason": reason,
                })
            }
            _ => serde_json::json!(null),
        };

        let status = self.status_code();

        let code_and_message = self.to_string();
        let code_and_message = code_and_message.split(":").collect::<Vec<&str>>();
        let code_and_message = match code_and_message.len() {
            2 => (code_and_message[0], code_and_message[1]),
            _ => (
                status.canonical_reason().unwrap_or("UnknownError"),
                code_and_message[0],
            ),
        };

        let body = serde_json::json!({
            "data": null,
            "error": {
                "status": status.as_u16(),
                "code": code_and_message.0.to_case(Case::Pascal),
                "message": code_and_message.1,
                "info": info
            }
        });

        HttpResponse::build(status)
            .insert_header(ContentType::json())
            .body(body.to_string())
    }

    fn status_code(&self) -> StatusCode {
        match self {
            Self::Backend(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Self::Frontend(_) => StatusCode::BAD_REQUEST,

            Self::ValidationError(_) => StatusCode::BAD_REQUEST,
            Self::EmailOrPasswordIncorrect => StatusCode::UNAUTHORIZED,
            Self::EmailAlreadyExists(_) => StatusCode::CONFLICT,
            Self::NotFound => StatusCode::NOT_FOUND,
            Self::ExpiredBearerToken => StatusCode::UNAUTHORIZED,
        }
    }
}
