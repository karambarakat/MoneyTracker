#![allow(unused_variables, unused_imports)]

use actix_web::*;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use std::{fmt, sync::Mutex};

mod state;
mod services {
    pub mod category;
}

mod graphql;

use graphql::{mutation::Mutation, query::Query};

use services::category::config as category;

use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

#[actix_web::main]

async fn main() -> std::io::Result<()> {
    let counter = web::Data::new(state::Counter {
        counter: Mutex::new(0),
    });

    HttpServer::new(move || {
        App::new()
            .configure(graphql::with_actix::configuration)
            .service(
                web::scope("/category")
                    .app_data(counter.clone())
                    .configure(category)
                    .route("/hi", web::to(state::count_handler)),
            )
            .service(
                web::scope("/log")
                    //
                    .app_data(counter.clone())
                    .configure(category)
                    .route("/hi", web::to(state::count_handler)),
            )
            .route("/hello", web::get().to(index))
            .service(web::resource("/hey").guard(guard::Post()).to(index))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

async fn index() -> impl Responder {
    HttpResponse::Ok().body("api is working")
}
