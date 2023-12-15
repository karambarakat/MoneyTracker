use async_graphql::*;
use rust_decimal::Decimal;
use sqlx::postgres::PgRow;
use sqlx::Row;

use crate::modules::Date;

use super::category::Category;
use super::numeric::Numeric;
use super::user::User;

#[derive(Debug, Default, serde::Serialize, async_graphql::SimpleObject)]
pub struct Entry {
    pub id: async_graphql::ID,
    pub title: String,
    pub amount: Numeric,
    pub note: Option<String>,

    pub created_by: User,
    pub category: Option<Category>,

    pub created_at: Date,
    pub updated_at: Date,
}

impl sqlx::FromRow<'_, PgRow> for Entry {
    fn from_row(row: &PgRow) -> Result<Self, sqlx::Error> {
        let id: i32 = row.try_get("id")?;
        let title: String = row.try_get("title")?;
        let amount: Decimal = row.try_get("amount")?;
        let amount: Numeric = Numeric(amount);
        let note: Option<String> = row.try_get("note")?;

        let created_at: Date = Date(row.try_get("created_at")?);
        let updated_at: Date = Date(row.try_get("updated_at")?);

        let user_id: i32 = row.try_get("user_id")?;
        let user_email: String = row.try_get("user_email")?;
        let user_display_name: Option<String> = row.try_get("user_display_name")?;
        let user_avatar: Option<String> = row.try_get("user_avatar")?;
        let user_providers: String = row.try_get("user_providers")?;
        let user_created_at: Date = Date(row.try_get("user_created_at")?);
        let user_updated_at: Date = Date(row.try_get("user_updated_at")?);

        let user = User {
            id: user_id.into(),
            email: user_email,
            display_name: user_display_name,
            avatar: user_avatar,
            providers: user_providers,
            created_at: user_created_at,
            updated_at: user_updated_at,
        };

        let category_id: Option<i32> = row.try_get("category_id")?;
        let category_title: Option<String> = row.try_get("category_title")?;
        let category_color: Option<String> = row.try_get("category_color")?;
        let category_icon: Option<String> = row.try_get("category_icon")?;
        // no one will know
        // let category_created_at: Option<Date> = Some(Date(row.try_get("category_created_at")?));
        // let category_updated_at: Option<Date> = Some(Date(row.try_get("category_updated_at")?));

        let cateogry = match category_id {
            Some(_) => Some(Category {
                id: category_id.unwrap().into(),
                title: category_title.unwrap(),
                color: category_color,
                icon: category_icon,
                created_by: user.clone(),
                created_at: created_at.clone(),
                updated_at: updated_at.clone(),
            }),
            None => None,
        };

        Ok(Entry {
            id: id.into(),
            title,
            amount,
            note,
            created_by: user.clone(),
            category: cateogry.clone(),
            created_at,
            updated_at,
        })
    }
}
