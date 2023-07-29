use actix_web::*;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use graphql::root::{Mutation, Query};
use std::{fmt, sync::Mutex};

mod services {
    pub mod category;
}

mod db;
mod graphql;
mod models;

#[actix_web::main]

async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

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
            .route(
                "/",
                web::get().to(|| async { HttpResponse::Ok().body("api is working") }),
            )
            .route("*", web::get().to(HttpResponse::NotFound))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
