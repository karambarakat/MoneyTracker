use actix_web::*;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use graphql::root::{Mutation, Query};
use std::{fmt, sync::Mutex};

mod services {
    pub mod local_auth;
}

mod graphql;
mod models;

#[actix_web::main]

async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    let port = std::env::var("PORT")
        .unwrap_or("8080".to_string())
        .parse::<u16>()
        .expect("port is not a number");

    let client = db::connect().await;

    let schema = Schema::build(Query::default(), Mutation::default(), EmptySubscription)
        .data(client.clone())
        .finish();

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .service(
                web::scope("/graphql")
                    .app_data(web::Data::new(schema.clone()))
                    .service(graphql::with_actix::graphql_playground)
                    .service(graphql::with_actix::graphql_endpoint),
            )
            .service(
                web::scope("/api/v1/auth/local").configure(crate::services::local_auth::config),
            )
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
    use mongodb::{Client, Database};

    pub async fn connect() -> Database {
        let uri = std::env::var("MONGO_URI").expect("no mongo uri");
        let db = std::env::var("MONDO_DB").expect("no mongo db");

        let client: Client = Client::with_uri_str(uri.clone()).await.unwrap();

        crate::models::user_model::db_init(&client).await;

        client.database(&db)
    }
}
