use async_graphql::*;
use futures::StreamExt;

use crate::modules::entry::Entry;

#[derive(Default)]
pub struct EntryQuery {}

#[Object]
impl EntryQuery {
    async fn get_all_entries(&self, ctx: &Context<'_>) -> Vec<Entry> {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, Entry>(
            r#"
            select 
                entry.id, title, amount, note,
                entry.created_at, entry.updated_at,

                users.id as user_id, email as user_email,
                display_name as user_display_name,
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at,

                category.id as category_id, category.title as category_title,
                category.color as category_color, category.icon as category_icon,
                category.created_at as category_created_at,
                category.updated_at as category_updated_at
            from entry
            join users on users.id = entry.created_by
            left join category on category.id = entry.category_id
            where created_by = $1;
            "#,
        )
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_all(pool)
        .await
        .unwrap();

        res
    }

    async fn get_one_entry(&self, ctx: &Context<'_>, id: ID) -> Option<Entry> {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, Entry>(
            r#"
            select 
                entry.id, title, amount, note,
                entry.created_at, entry.updated_at,

                users.id as user_id, email as user_email,
                display_name as user_display_name,
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at,

                category.id as category_id, category.title as category_title,
                category.color as category_color, category.icon as category_icon,
                category.created_at as category_created_at,
                category.updated_at as category_updated_at
            from entry
            join users on users.id = entry.created_by
            join category on category.id = entry.category_id
            where entry.id = $1 and created_by = $2;
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
pub struct EntryMutation;

#[derive(Debug, Default, async_graphql::InputObject)]
pub struct EntryInput {
    pub title: String,
    pub amount: Option<f64>,
    pub note: Option<String>,
    pub category: Option<async_graphql::ID>,
}

use sqlx::Row;

#[Object]
impl EntryMutation {
    async fn create_one_entry(&self, ctx: &Context<'_>, entry: EntryInput) -> Entry {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query(
            r#"
            insert into entry (created_by, title, amount, note, category_id)
            values               ($1, $2, $3, $4, $5)
            returning id;
            "#,
        )
        .bind(user.id.parse::<i32>().unwrap())
        .bind(entry.title)
        .bind(entry.amount)
        .bind(entry.note)
        .bind(
            entry
                .category
                .map(|x| x.to_string().parse::<i32>().unwrap()),
        )
        .fetch_one(pool)
        .await
        .unwrap();

        let id = res.try_get::<i32, _>("id").unwrap();

        let res = sqlx::query_as::<_, Entry>(
            r#"
            select 
                entry.id, title, amount, note,
                entry.created_at, entry.updated_at,

                users.id as user_id, email as user_email,
                display_name as user_display_name,
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at,

                category.id as category_id, category.title as category_title,
                category.color as category_color, category.icon as category_icon,
                category.created_at as category_created_at,
                category.updated_at as category_updated_at
            from entry
            join users on users.id = entry.created_by
            join category on category.id = entry.category_id
            where entry.id = $1 and created_by = $2;
            "#,
        )
        .bind(id)
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_one(pool)
        .await
        .unwrap();

        res
    }

    async fn create_many_entries(&self, ctx: &Context<'_>, entries: Vec<EntryInput>) -> Vec<Entry> {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let mut tx = pool.begin().await.unwrap();

        let mut ids = Vec::new();

        for entry in entries {
            let res = sqlx::query(
                r#"
                insert into entry (created_by, title, amount, note, category_id) 
                values               ($1, $2, $3, $4, $5)
                returning id;
                "#,
            )
            .bind(user.id.parse::<i32>().unwrap())
            .bind(entry.title)
            .bind(entry.amount)
            .bind(entry.note)
            .bind(
                entry
                    .category
                    .map(|x| x.to_string().parse::<i32>().unwrap()),
            )
            .fetch_one(pool)
            .await
            .unwrap();

            let id = res.try_get::<i32, _>("id").unwrap();
            ids.push(id);
        }

        tx.commit().await.unwrap();

        let res = sqlx::query_as::<_, Entry>(
            r#"
            select 
                entry.id, title, amount, note,
                entry.created_at, entry.updated_at,

                users.id as user_id, email as user_email,
                display_name as user_display_name,
                avatar as user_avatar,
                providers as user_providers,
                users.created_at as user_created_at,
                users.updated_at as user_updated_at,

                category.id as category_id, category.title as category_title,
                category.color as category_color, category.icon as category_icon,
                category.created_at as category_created_at,
                category.updated_at as category_updated_at
            from entry
            join users on users.id = entry.created_by
            join category on category.id = entry.category_id
            where entry.id = any($1) and created_by = $2;
            "#,
        )
        .bind(ids)
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_all(pool)
        .await
        .unwrap();

        res
    }

    async fn delete_one_entry(&self, ctx: &Context<'_>, id: ID) -> bool {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let id = id.to_string().parse::<i32>().unwrap();

        let res = sqlx::query(
            r#"
            delete from entry where id = $1 and created_by = $2
            "#,
        )
        .bind(id)
        .bind(user.id.parse::<i32>().unwrap())
        .execute(pool)
        .await
        .unwrap();

        res.rows_affected() == 1
    }

    async fn delete_many_entries(&self, ctx: &Context<'_>, ids: Vec<ID>) -> u64 {
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
            delete from entry where id = any($1) and created_by = $2
            "#,
        )
        .bind(ids)
        .bind(user.id.parse::<i32>().unwrap())
        .execute(pool)
        .await
        .unwrap();

        res.rows_affected()
    }

    async fn update_one_entry(&self, ctx: &Context<'_>, id: ID, entry: EntryInput) -> bool {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let id = id.to_string().parse::<i32>().unwrap();

        let res = sqlx::query(
            r#"
            update entry set title = $1, amount = $2, note = $3, category_id = $4
            where id = $5 and created_by = $6
            "#,
        )
        .bind(entry.title)
        .bind(entry.amount)
        .bind(entry.note)
        .bind(
            entry
                .category
                .map(|x| x.to_string().parse::<i32>().unwrap()),
        )
        .bind(id)
        .bind(user.id.parse::<i32>().unwrap())
        .execute(pool)
        .await
        .unwrap();

        res.rows_affected() == 1
    }
}
