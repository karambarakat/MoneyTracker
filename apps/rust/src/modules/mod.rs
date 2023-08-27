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

pub mod numeric {
    use sqlx::Encode;

    #[derive(Debug, Default, async_graphql::InputObject)]
    pub struct EntryInput {
        pub title: String,
        pub amount: Numeric,
        pub note: Option<String>,
        pub category: Option<async_graphql::ID>,
    }

    #[derive(Debug, Default)]
    pub struct Numeric(pub rust_decimal::Decimal);

    impl async_graphql::InputType for Numeric {
        type RawValueType = rust_decimal::Decimal;

        fn type_name() -> std::borrow::Cow<'static, str> {
            "DECIMAL".into()
        }

        fn create_type_info(registry: &mut async_graphql::registry::Registry) -> String {
            <f32 as async_graphql::InputType>::create_type_info(registry)
        }

        fn parse(value: Option<async_graphql::Value>) -> async_graphql::InputValueResult<Self> {
            let result = match value {
                Some(async_graphql::Value::Number(n)) => {
                    n.to_string().parse::<rust_decimal::Decimal>().unwrap()
                }
                _ => {
                    return Err(async_graphql::InputValueError::expected_type(
                        value.unwrap_or_default(),
                    ))
                }
            };

            Ok(Self(result))
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
    impl<'q> sqlx::Encode<'q, sqlx::Postgres> for Numeric {
        fn encode_by_ref(
            &self,
            buf: &mut <sqlx::Postgres as sqlx::database::HasArguments<'q>>::ArgumentBuffer,
        ) -> sqlx::encode::IsNull {
            <String as sqlx::Encode<sqlx::Postgres>>::encode_by_ref(&self.0.to_string(), buf)
        }

        fn size_hint(&self) -> usize {
            <String as sqlx::Encode<sqlx::Postgres>>::size_hint(&self.0.to_string())
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
