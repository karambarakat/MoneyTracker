use actix_web::*;
use async_graphql::{EmptySubscription, Schema};
use graphql::root::{Mutation, Query};

mod graphql;
mod models;
use sqlx::postgres::PgPoolOptions;

#[actix_web::main]

async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    let port = std::env::var("PORT")
        .unwrap_or("8080".to_string())
        .parse::<u16>()
        .expect("port is not a number");

    let db_connection = std::env::var("POSTGRES_DB").expect("no database url");

    let pool = db::connect().await;

    #[derive(sqlx::FromRow)]
    struct User {
        id: i32,
        email: String,
        password: String,
        display_name: String,
        avatar: Option<String>,
        providers: Option<String>,
        created_at: String,
        updated_at: String,
    }

    let mut rows = sqlx::query_as::<_, models::user::User>("SELECT * FROM users;").fetch(&pool);

    use futures::TryStreamExt;
    use sqlx::Row;

    while let Some(row) = rows.try_next().await.unwrap() {
        // map the row into a user-defined domain type
        println!("user: {:?}", row);
    }

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(
                web::scope("/graphql")
                    .app_data(web::Data::new(pool.clone()))
                    .service(graphql::with_actix::graphql_playground)
                    .service(graphql::with_actix::graphql_endpoint),
            )
            // .service(
            //     web::scope("/api/v1/auth/local").configure(crate::services::local_auth::config),
            // )
            .route(
                "/",
                web::get().to(|| async { HttpResponse::Ok().body("api is working") }),
            )
            .route("*", web::get().to(HttpResponse::NotFound))
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}

mod db {
    use sqlx::postgres::PgPoolOptions;

    pub async fn connect() -> sqlx::PgPool {
        let db_connection = std::env::var("POSTGRES_DB").expect("no database url");

        let pool = PgPoolOptions::new()
            .max_connections(5)
            .connect(&db_connection)
            .await
            .expect("no database connection");

        sqlx::query(
            r#"CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            display_name VARCHAR,
            avatar VARCHAR,
            providers VARCHAR,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );"#,
        )
        .execute(&pool)
        .await
        .unwrap();

        sqlx::query(
            r#"CREATE TABLE IF NOT EXISTS category (
            id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            color VARCHAR,
            icon VARCHAR,
            created_by integer NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id)
        );"#,
        )
        .execute(&pool)
        .await
        .unwrap();

        sqlx::query(
            r#"CREATE TABLE IF NOT EXISTS entry (
            id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            amount integer NOT NULL,
            category integer,
            created_by integer NOT NULL,
            note VARCHAR,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category) REFERENCES category(id),
            FOREIGN KEY (created_by) REFERENCES users(id)
        );"#,
        )
        .execute(&pool)
        .await
        .unwrap();

        pool
    }
}
