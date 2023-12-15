use async_graphql::*;

use crate::modules::user::User;

#[derive(Default)]
pub struct UserQuery {}

#[Object]
impl UserQuery {
    async fn get_current_user(&self, ctx: &Context<'_>) -> User {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let user = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, User>(
            r#"
            select 
                id, email, display_name, avatar, providers, created_at, updated_at
            from users
            where id = $1;
            "#,
        )
        .bind(user.id.parse::<i32>().unwrap())
        .fetch_one(pool)
        .await
        .unwrap();

        res
    }
}

#[derive(InputObject, Default)]
struct UserInput {
    pub display_name: Option<String>,
    pub avatar: Option<String>,
}

#[derive(Default)]
pub struct UserMutation;

#[Object]
impl UserMutation {
    async fn update_current_user(&self, ctx: &Context<'_>, user: UserInput) -> User {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let authenticated = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query_as::<_, User>(
            r#"
            update users
            set display_name = $1, avatar = $2
            where id = $3
            returning id, email, display_name, avatar, providers, created_at, updated_at;
            "#,
        )
        .bind(user.display_name)
        .bind(user.avatar)
        .bind(authenticated.id.parse::<i32>().unwrap())
        .fetch_one(pool)
        .await
        .unwrap();

        res
    }
// todo add another function to update password
// that requires the old password to match
    async fn update_password(&self, ctx: &Context<'_>, password: String) -> bool {
        let pool = ctx
            .data::<sqlx::Pool<sqlx::Postgres>>()
            .expect("app configured incorrectly");

        let encrypt = crate::middlewares::basic_token::BasicToken::new("".to_string(), password);

        let authenticated = ctx
            .data::<crate::middlewares::user::User>()
            .expect("app configured incorrectly");

        let res = sqlx::query(
            r#"
            update users
            set password = $1
            where id = $2;
            "#,
        )
        .bind(encrypt.password)
        .bind(authenticated.id.parse::<i32>().unwrap())
        .execute(pool)
        .await
        .unwrap();

        res.rows_affected() == 1
    }
}
