pub use http_error_derive::HttpError;

pub trait HttpError {
    fn error_code(&self) -> String {
        "internal_error".to_string()
    }

    fn error_status_u16(&self) -> u16 {
        500
    }
}
