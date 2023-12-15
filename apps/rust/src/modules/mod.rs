use async_graphql::*;
use chrono::serde::ts_seconds;

#[derive(Debug, Clone, Default, serde::Deserialize, serde::Serialize)]
pub struct Date(#[serde(with = "ts_seconds")] pub chrono::DateTime<chrono::Utc>);

#[Scalar]
impl ScalarType for Date {
    fn parse(_value: Value) -> InputValueResult<Self> {
        todo!()
    }

    fn to_value(&self) -> Value {
        Value::String(self.0.to_rfc3339())
    }
}

pub mod numeric {
    use std::str::FromStr;

    use async_graphql::{Positioned, Value};
    use rust_decimal::Decimal;

    #[derive(Debug, Default, async_graphql::InputObject)]
    pub struct EntryInput {
        pub title: String,
        pub amount: Numeric,
        pub note: Option<String>,
        pub category: Option<async_graphql::ID>,
    }

    #[derive(Debug, Clone, Default, serde::Serialize)]
    pub struct Numeric(pub rust_decimal::Decimal);

    impl async_graphql::InputType for Numeric {
        type RawValueType = rust_decimal::Decimal;

        fn type_name() -> std::borrow::Cow<'static, str> {
            "DECIMAL NUMBER".into()
        }

        fn create_type_info(registry: &mut async_graphql::registry::Registry) -> String {
            <f32 as async_graphql::InputType>::create_type_info(registry)
        }

        fn parse(value: Option<async_graphql::Value>) -> async_graphql::InputValueResult<Self> {
            let rt: String = match value {
                Some(Value::Number(num)) => num.to_string(),
                _ => {
                    return Err(async_graphql::InputValueError::expected_type(
                        value.unwrap_or(Value::Null),
                    ))
                }
            };

            Ok(Numeric(Decimal::from_str(&rt).map_err(|_| {
                async_graphql::InputValueError::custom("invalid decimal number")
            })?))
        }

        fn to_value(&self) -> async_graphql::Value {
            async_graphql::Value::Number(
                async_graphql::Number::from_f64(self.0.try_into().unwrap()).unwrap(),
            )
        }

        fn as_raw_value(&self) -> Option<&Self::RawValueType> {
            Some(&self.0)
        }
    }

    #[async_trait::async_trait]
    impl async_graphql::OutputType for Numeric {
        fn type_name() -> std::borrow::Cow<'static, str> {
            "DECIMAL".into()
        }

        fn create_type_info(registry: &mut async_graphql::registry::Registry) -> String {
            <f32 as async_graphql::OutputType>::create_type_info(registry)
        }

        async fn resolve(
            &self,
            _: &async_graphql::ContextSelectionSet<'_>,
            field: &Positioned<async_graphql::parser::types::Field>,
        ) -> async_graphql::ServerResult<async_graphql::Value> {
            let res = serde_json::Number::from_str(&self.0.to_string()).map_err(|_| {
                async_graphql::ServerError::new("can't retrieve decimal number", Some(field.pos))
            })?;

            Ok(async_graphql::Value::Number(res))
        }
    }

    impl sqlx::Type<sqlx::Postgres> for Numeric {
        fn type_info() -> sqlx::postgres::PgTypeInfo {
            <String as sqlx::Type<sqlx::Postgres>>::type_info()
        }
    }
}

pub mod category;
pub mod entry;
pub mod user;
