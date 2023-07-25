use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

use std::sync::Mutex;

pub struct Counter {
    pub counter: Mutex<i32>, // <- Mutex is necessary to mutate safely across threads
}

pub async fn count_handler(data: web::Data<crate::state::Counter>) -> String {
    let mut counter = data.counter.lock().unwrap();

    *counter += 1;

    format!("Request number: {counter}")
}
