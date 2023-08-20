use async_graphql::*;
use futures::StreamExt;

#[derive(Default)]
pub struct Date(pub chrono::DateTime<chrono::Utc>);

#[Scalar]
impl ScalarType for Date {
    fn parse(value: Value) -> InputValueResult<Self> {
        todo!()
    }

    fn to_value(&self) -> Value {
        Value::String(self.0.to_rfc3339())
    }
}

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
    async fn get_all_users(&self, ctx: &Context<'_>) -> Vec<User> {
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
    async fn create_one_user(&self, ctx: &Context<'_>, user: UserInput) -> User {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (email, password, display_name, avatar, providers)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, display_name, avatar, providers, created_at, updated_at;
            "#,
        )
        .bind(user.email)
        .bind(user.password)
        .bind(user.display_name)
        .bind(user.avatar)
        .bind("local,google")
        .fetch_one(pool);

        res.await.unwrap().into()
    }
}
