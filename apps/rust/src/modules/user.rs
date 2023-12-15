use async_graphql::*;
use sqlx::postgres::PgRow;
use sqlx::Row;

use crate::modules::Date;

impl<'r> sqlx::FromRow<'r, PgRow> for User {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        let id: i32 = row.try_get("id")?;
        let email: String = row.try_get("email")?;
        let display_name: Option<String> = row.try_get("display_name")?;
        let avatar: Option<String> = row.try_get("avatar")?;
        let providers: String = row.try_get("providers")?;
        let created_at: Date = Date(row.try_get("created_at")?);
        let updated_at: Date = Date(row.try_get("updated_at")?);

        Ok(User {
            id: id.into(),
            email,
            display_name,
            avatar,
            providers,
            created_at,
            updated_at,
        })
    }
}

#[derive(Debug, Clone, Default, async_graphql::SimpleObject, serde::Serialize)]
pub struct User {
    pub id: async_graphql::ID,
    pub email: String,
    pub display_name: Option<String>,
    pub avatar: Option<String>,
    pub providers: String,
    pub created_at: Date,
    pub updated_at: Date,
}

#[allow(dead_code)]
// for some limitation for ts_rs, this exists for the sake of simplicity
#[derive(ts_rs::TS)]
#[ts(export)]
struct UserRestResponse {
    pub id: String,
    pub email: String,
    pub display_name: Option<String>,
    pub avatar: Option<String>,
    pub providers: String,
    pub created_at: i32,
    pub updated_at: i32,
}
