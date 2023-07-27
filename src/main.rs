#![allow(unused_variables, unused_imports)]

use actix_web::*;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use std::{fmt, sync::Mutex};

mod state;
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

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .configure(graphql::with_actix::configuration)
            .service(web::scope("/category").configure(category))
            .service(web::scope("/log").configure(category))
            .route("/api", web::get().to(HttpResponse::Ok))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
