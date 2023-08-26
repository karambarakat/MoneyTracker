use async_graphql::*;
use chrono::serde::ts_seconds;

#[derive(Debug, Clone, Default, serde::Deserialize, serde::Serialize)]
pub struct Date(#[serde(with = "ts_seconds")] pub chrono::DateTime<chrono::Utc>);

#[Scalar]
impl ScalarType for Date {
    fn parse(value: Value) -> InputValueResult<Self> {
        todo!()
    }

    fn to_value(&self) -> Value {
        Value::String(self.0.to_rfc3339())
    }
}

pub mod category;
pub mod entry;
pub mod user;
