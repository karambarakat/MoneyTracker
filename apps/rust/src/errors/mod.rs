use actix_web::{
    body::BoxBody,
    http::{header::ContentType, StatusCode},
    HttpRequest, HttpResponse, Responder, ResponseError,
};
use backend_macro::HttpError;

use std::fmt::Debug;
use thiserror::Error;

#[derive(Debug, derive_more::Display, Error, serde::Serialize, ts_rs::TS, HttpError)]
#[ts(export)]
pub enum MyErrors {
    #[display(fmt = "email already exists: {0}", _0)]
    #[http_error(status = 409)]
    EmailAlreadyExists(String),
    #[display(fmt = "email or password is incorrect")]
    #[http_error(status = 401)]
    EmailOrPasswordIncorrect,
    #[display(fmt = "validation error: {0}", _0)]
    #[http_error(status = 400)]
    ValidationError(String),
    #[display(fmt = "not found")]
    #[http_error(status = 404)]
    NotFound,
    #[display(fmt = "token expired")]
    #[http_error(status = 401)]
    ExpiredBearerToken,

    /// error that should not happened if my code is correct
    #[display(fmt = "internal error")]
    #[http_error(status = 500)]
    #[serde(skip)]
    InternalError(Box<dyn std::error::Error>),

    /// error that is the frontend dev`s responsibility. With a non-user-facing error message
    #[display(fmt = "bad request")]
    #[http_error(status = 400)]
    BadRequest(String),
}

use convert_case::{Case, Casing};

impl ResponseError for MyErrors {
    fn error_response(&self) -> HttpResponse {
        if let Self::InternalError(reason) = self {
            println!("internal error: {:?}", reason);
        }

        let info = match self {
            Self::BadRequest(reason) => {
                serde_json::json!({
                    "reason": reason,
                })
            }
            _ => serde_json::json!(null),
        };

        let status = self.status_code();

        let body = serde_json::json!({
            "data": null,
            "error": {
                "status": self.error_status_u16(),
                "code": self.error_code().to_case(Case::Pascal),
                "message": self.to_string(),
                "info": info
            }
        });

        HttpResponse::build(status)
            .insert_header(ContentType::json())
            .body(body.to_string())
    }

    fn status_code(&self) -> StatusCode {
        StatusCode::from_u16(self.error_status_u16()).unwrap()
    }
}

impl Responder for MyErrors {
    type Body = BoxBody;
    fn respond_to(self, _: &HttpRequest) -> HttpResponse<Self::Body> {
        self.error_response()
    }
}
