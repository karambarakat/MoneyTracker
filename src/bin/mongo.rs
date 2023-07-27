use dotenv::dotenv;
use mongodb::bson::doc;

// use async_graphql::*;
#[derive(Debug)]
enum Error {}
#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv().ok();
    let uri = std::env::var("MONGO_URI").expect("no mongo env var found");

    let client = mongodb::Client::with_uri_str(&uri)
        .await
        .expect("failed to connect to mongo");

    let res = client
        .database("rust")
        // .collection("test")
        .run_command(
            doc! {
                "ping": "test",
            },
            None,
        )
        .await
        .expect("failed to insert");

    print!("hello world");

    Ok(())
}
