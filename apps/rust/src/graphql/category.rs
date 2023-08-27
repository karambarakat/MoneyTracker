use async_graphql::*;
use futures::StreamExt;

use crate::modules::category::Category;

#[derive(Default)]
pub struct CategoryQuery {}

#[Object]
impl CategoryQuery {
    async fn get_all_categories(&self, ctx: &Context<'_>) -> Vec<Category> {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, Category>(
            r#"
            select 
                category.id, title, color, icon,
                category.created_at, category.updated_at,

                users.id as user_id, email as user_email, 
                display_name as user_display_name, 
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at
            from category 
            join users on users.id = category.created_by
            where created_by = $1;
            "#,
        )
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_all(pool)
        .await
        .unwrap();

        res
    }

    async fn get_one_category(&self, ctx: &Context<'_>, id: ID) -> Option<Category> {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, Category>(
            r#"
            select 
                category.id, title, color, icon,
                category.created_at, category.updated_at,

                users.id as user_id, email as user_email, 
                display_name as user_display_name, 
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at
            from category 
            join users on users.id = category.created_by
            where category.id = $1 and created_by = $2;
            "#,
        )
        .bind(id.to_string().parse::<i32>().unwrap())
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_optional(pool)
        .await
        .unwrap();

        res
    }
}

#[derive(Default)]
pub struct CategoryMutation;

#[derive(Debug, Default, async_graphql::InputObject)]
pub struct CategoryInput {
    pub title: String,
    pub color: Option<String>,
    pub icon: Option<String>,
}

use sqlx::Row;

#[Object]
impl CategoryMutation {
    async fn create_one_category(&self, ctx: &Context<'_>, category: CategoryInput) -> Category {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query(
            r#"
            insert into category (created_by, title, color, icon) 
            values               ($1, $2, $3, $4)
            returning id;
            "#,
        )
        .bind(user.id.parse::<i32>().unwrap())
        .bind(category.title)
        .bind(category.color)
        .bind(category.icon)
        .fetch_one(pool)
        .await
        .unwrap();

        let id = res.try_get::<i32, _>("id").unwrap();

        let res = sqlx::query_as::<_, Category>(
            r#"
            select 
                category.id, title, color, icon,
                category.created_at, category.updated_at,

                users.id as user_id, email as user_email, 
                display_name as user_display_name, 
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at
            from category 
            join users on users.id = category.created_by
            where category.id = $1 and created_by = $2;
            "#,
        )
        .bind(id)
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_one(pool)
        .await
        .unwrap();

        res
    }

    async fn create_many_categories(
        &self,
        ctx: &Context<'_>,
        categories: Vec<CategoryInput>,
    ) -> Vec<Category> {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let mut tx = pool.begin().await.unwrap();

        let mut ids = Vec::new();

        for category in categories {
            let res = sqlx::query(
                r#"
                insert into category (created_by, title, color, icon) 
                values               ($1, $2, $3, $4)
                returning id;
                "#,
            )
            .bind(user.id.parse::<i32>().unwrap())
            .bind(category.title)
            .bind(category.color)
            .bind(category.icon)
            .fetch_one(pool)
            .await
            .unwrap();

            let id = res.try_get::<i32, _>("id").unwrap();
            ids.push(id);
        }

        tx.commit().await.unwrap();

        let res = sqlx::query_as::<_, Category>(
            r#"
            select 
                category.id, title, color, icon,
                category.created_at, category.updated_at,

                users.id as user_id, email as user_email, 
                display_name as user_display_name, 
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at
            from category 
            join users on users.id = category.created_by
            where category.id = any($1) and created_by = $2;
            "#,
        )
        .bind(ids)
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_all(pool)
        .await
        .unwrap();

        res
    }

    async fn delete_one_category(&self, ctx: &Context<'_>, id: ID) -> bool {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let id = id.to_string().parse::<i32>().unwrap();

        let res = sqlx::query(
            r#"
            delete from category where id = $1 and created_by = $2
            "#,
        )
        .bind(id)
        .bind(user.id.parse::<i32>().unwrap())
        .execute(pool)
        .await
        .unwrap();

        res.rows_affected() == 1
    }

    async fn delete_many_categories(&self, ctx: &Context<'_>, ids: Vec<ID>) -> u64 {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let ids = ids
            .iter()
            .map(|id| id.to_string().parse::<i32>().unwrap())
            .collect::<Vec<_>>();

        let res = sqlx::query(
            r#"
            delete from category where id = any($1) and created_by = $2
            "#,
        )
        .bind(ids)
        .bind(user.id.parse::<i32>().unwrap())
        .execute(pool)
        .await
        .unwrap();

        res.rows_affected()
    }

    async fn update_one_category(
        &self,
        ctx: &Context<'_>,
        id: ID,
        category: CategoryInput,
    ) -> bool {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let id = id.to_string().parse::<i32>().unwrap();

        let res = sqlx::query(
            r#"
            update category set title = $1, color = $2, icon = $3 where id = $4 and created_by = $5
            "#,
        )
        .bind(category.title)
        .bind(category.color)
        .bind(category.icon)
        .bind(id)
        .bind(user.id.parse::<i32>().unwrap())
        .execute(pool)
        .await
        .unwrap();

        res.rows_affected() == 1
    }
}
