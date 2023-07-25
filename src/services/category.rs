use actix_web::{get, web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(manual_hello);
}

#[get("/")]
async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}
