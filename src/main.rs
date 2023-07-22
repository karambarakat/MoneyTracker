use actix_web::{get, App, HttpServer, Responder};

#[get("/")]
async fn log() -> impl Responder {
    "Hello, rust!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(log))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
