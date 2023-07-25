#![allow(unused_variables, unused_imports)]

use actix_web::*;
use std::{fmt, sync::Mutex};

mod state;
mod services {
    pub mod category;
}

use services::category::config as category;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let counter = web::Data::new(state::Counter {
        counter: Mutex::new(0),
    });

    HttpServer::new(move || {
        App::new()
            .service(
                web::scope("/category")
                    .app_data(counter.clone())
                    .configure(category)
                    .route("/hi", web::to(state::count_handler)),
            )
            .service(
                web::scope("/log")
                    .app_data(counter.clone())
                    .configure(category)
                    .route("/hi", web::to(state::count_handler)),
            )
            .route("/hello", web::get().to(index))
            .service(web::resource("/hey").to(index))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

async fn index() -> impl Responder {
    HttpResponse::Ok().body("api is working")
}
