use actix_web::{
    body::BoxBody,
    http::{header::ContentType, StatusCode},
    HttpRequest, HttpResponse, Responder, ResponseError,
};
use backend_macro::HttpError;

use std::{collections::HashMap, fmt::Debug};

#[derive(Debug, derive_more::Display, thiserror::Error, serde::Serialize, ts_rs::TS, HttpError)]
#[ts(export)]
pub enum MyErrors {
    #[display(fmt = "email already exists: {0}", _0)]
    #[http_error(status = 409, validate)]
    EmailAlreadyExists(String),

    #[display(fmt = "email or password is incorrect")]
    #[http_error(status = 401)]
    EmailOrPasswordIncorrect,

    #[display(fmt = "validation error: {0}", _0)]
    #[http_error(status = 400, validate)]
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

    #[display(fmt = "internal error")]
    #[http_error(status = 500)]
    #[serde(rename = "InternalServerError")]
    #[allow(dead_code)]
    ForTsRs,

    /// error that is the frontend dev`s responsibility. With a non-user-facing error message
    #[display(fmt = "Ops, some error occured, please try again")]
    #[http_error(status = 400, reason)]
    BadRequest(String),
}

impl MyErrors {
    /// used forms where the body of the request has invalid fields
    fn error_fields(&self) -> Option<HashMap<String, String>> {
        match self {
            Self::EmailAlreadyExists(email) => Some(HashMap::from([(
                "email".to_string(),
                format!("{0} already used, try to login", email).to_string(),
            )])),
            Self::ValidationError(field) => Some(HashMap::from([(
                field.clone(),
                format!("`{0}` is invalid", field),
            )])),
            _ => None,
        }
    }

    /// a non-user-facing error message
    fn error_reason(&self) -> Option<String> {
        match self {
            Self::BadRequest(r) => Some(r.to_string()),
            _ => None,
        }
    }
}

impl ResponseError for MyErrors {
    fn error_response(&self) -> HttpResponse {
        if let Self::InternalError(reason) = self {
            println!("internal error: {:?}", reason);
        }

        let mut info: HashMap<String, serde_json::Value> = HashMap::new();

        if let Some(reason) = self.error_reason() {
            info.insert("reason".to_string(), serde_json::json!(reason));
        }

        if let Some(fields) = self.error_fields() {
            info.insert(
                "fields".to_string(),
                fields.into_iter().collect::<serde_json::Value>(),
            );
        }

        let info = info.into_iter().collect::<serde_json::Map<_, _>>();

        use convert_case::{Case, Casing};

        let body = serde_json::json!({
            "data": null,
            "error": {
                "status": self.error_status_u16(),
                "code": self.error_code().to_case(Case::Pascal),
                "message": self.to_string(),
                "info": info
            }
        });

        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(body.to_string())
    }

    fn status_code(&self) -> StatusCode {
        StatusCode::from_u16(self.error_status_u16()).unwrap()
    }
}

//// ts_rs is not mature yet
// #[derive(serde::Serialize, ts_rs::TS)]
// #[ts(export)]
// struct ErrorPayload {
//     status: u16,
//     message: String,
//     code: String,
//     info: HashMap<String, String>,
// }

impl Responder for MyErrors {
    type Body = BoxBody;
    fn respond_to(self, _: &HttpRequest) -> HttpResponse<Self::Body> {
        self.error_response()
    }
}
