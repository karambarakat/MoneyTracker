use async_graphql::*;
use sqlx::postgres::PgRow;
use sqlx::Row;

use crate::modules::Date;

use super::user::User;

impl<'r> sqlx::FromRow<'r, PgRow> for Category {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        let id: i32 = row.try_get("id")?;
        let title: String = row.try_get("title")?;
        let color: Option<String> = row.try_get("color")?;
        let icon: Option<String> = row.try_get("icon")?;
        let created_at: Date = Date(row.try_get("created_at")?);
        let updated_at: Date = Date(row.try_get("updated_at")?);

        let user_id: i32 = row.try_get("user_id")?;
        let user_email: String = row.try_get("user_email")?;
        let user_display_name: Option<String> = row.try_get("user_display_name")?;
        let user_avatar: Option<String> = row.try_get("user_avatar")?;
        let user_providers: String = row.try_get("user_providers")?;
        let user_created_at: Date = Date(row.try_get("user_created_at")?);
        let user_updated_at: Date = Date(row.try_get("user_updated_at")?);

        Ok(Category {
            id: id.into(),
            title,
            color,
            icon,
            created_by: User {
                id: user_id.into(),
                email: user_email,
                display_name: user_display_name,
                avatar: user_avatar,
                providers: user_providers,
                created_at: user_created_at,
                updated_at: user_updated_at,
            },
            created_at,
            updated_at,
        })
    }
}

#[derive(Debug, Default, async_graphql::SimpleObject, serde::Serialize)]
pub struct Category {
    pub id: async_graphql::ID,
    pub title: String,
    pub color: Option<String>,
    pub icon: Option<String>,
    pub created_by: User,
    pub created_at: Date,
    pub updated_at: Date,
}
