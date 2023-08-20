use async_graphql::*;
use futures::StreamExt;

#[derive(Default)]
struct Date(pub chrono::DateTime<chrono::Utc>);

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
struct Category {
    pub id: ID,
    pub color: Option<String>,
    pub icon: Option<String>,
    pub title: String,
    pub created_at: Date,
    pub updated_at: Date,
}

use sqlx::postgres::PgRow;
use sqlx::Row;
impl<'r> sqlx::FromRow<'r, PgRow> for Category {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        let id: i32 = row.try_get("id")?;
        let color: Option<String> = row.try_get("color")?;
        let icon: Option<String> = row.try_get("icon")?;
        let title: String = row.try_get("title")?;
        let created_at: Date = Date(row.try_get("created_at")?);
        let updated_at: Date = Date(row.try_get("updated_at")?);

        Ok(Category {
            id: id.into(),
            color,
            icon,
            title,
            created_at,
            updated_at,
        })
    }
}

#[derive(InputObject, Default)]
struct CategoryInput {
    pub color: Option<String>,
    pub icon: Option<String>,
    pub title: String,
}

#[derive(Default)]
pub struct CategoryQuery {}

#[Object]
impl CategoryQuery {
    async fn get_all_categories(&self, ctx: &Context<'_>) -> Vec<Category> {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, Category>("SELECT * FROM category_temp").fetch_all(pool);

        res.await.unwrap()
    }

    async fn say_hi(&self, ctx: &Context<'_>) -> String {
        let auth = ctx.data::<String>().unwrap();

        auth.to_string()
    }
}

#[derive(Default)]
pub struct CategoryMutation;

#[Object]
impl CategoryMutation {
    async fn create_one_category(&self, ctx: &Context<'_>, category: CategoryInput) -> Category {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, Category>(
            r#"
            INSERT INTO category_temp (title, color, icon)
            VALUES ($1, $2, $3)
            RETURNING id, title, color, icon, created_at, updated_at;
            "#,
        )
        .bind(category.title)
        .bind(category.color)
        .bind(category.icon)
        .fetch_one(pool);

        res.await.unwrap().into()
    }
}
