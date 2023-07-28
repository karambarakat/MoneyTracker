use mongodb::bson::doc;
use mongodb::options::IndexOptions;
use mongodb::{Client, Database, IndexModel};

pub async fn connect() -> Database {
    let uri = std::env::var("MONGO_URI").expect("no mongo uri");
    let db = std::env::var("MONDO_DB").expect("no mongo db");

    let client = Client::with_uri_str(uri.clone()).await.unwrap();

    client
        .database(&db)
        .collection::<crate::models::User>("profile")
        .create_index(
            IndexModel::builder()
                .keys(doc! { "email": 1})
                .options(IndexOptions::builder().unique(true).build())
                .build(),
            None,
        )
        .await
        .unwrap();

    client.database(&db)
}
