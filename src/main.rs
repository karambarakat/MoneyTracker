#![allow(unused_variables, unused_imports)]

use actix_web::*;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use graphql::Root::{Mutation, Query};
use std::{fmt, sync::Mutex};

mod services {
    pub mod category;
}

mod db;
mod graphql;
mod models;

use services::category::config as category;

use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

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
            .service(web::scope("/category").configure(category))
            .service(web::scope("/log").configure(category))
            .route("/api", web::get().to(HttpResponse::Ok))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
