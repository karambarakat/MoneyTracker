use async_graphql::*;
use futures::StreamExt;

use crate::modules::Date;

#[derive(Default, SimpleObject)]
pub struct User {
    pub id: ID,
    pub email: String,
    pub display_name: Option<String>,
    pub avatar: Option<String>,
    pub providers: String,
    pub created_at: Date,
    pub updated_at: Date,
}

use sqlx::postgres::PgRow;
use sqlx::Row;

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

#[derive(InputObject, Default)]
struct UserInput {
    pub email: String,
    pub password: String,
    pub display_name: Option<String>,
    pub avatar: Option<String>,
}

#[derive(Default)]
pub struct UserQuery {}

#[Object]
impl UserQuery {
    async fn update_current_user(&self, ctx: &Context<'_>) -> Vec<User> {
        todo!();
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, User>("SELECT * FROM users").fetch_all(pool);

        res.await.unwrap()
    }
}

#[derive(Default)]
pub struct UserMutation;

#[Object]
impl UserMutation {
    async fn update_current_user(&self, ctx: &Context<'_>) -> Vec<User> {
        todo!();
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, User>("SELECT * FROM users").fetch_all(pool);

        res.await.unwrap()
    }
}
