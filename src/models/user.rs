#[derive(sqlx::FromRow)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub password: String,
    pub display_name: String,
    pub avatar: Option<String>,
    pub providers: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}
