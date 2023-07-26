use async_graphql::*;

struct Query;

#[Object]
impl Query {
    async fn hello(&self, name: String) -> String {
        format!("hello {name}")
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    let schema = Schema::new(Query, EmptyMutation, EmptySubscription);

    let query = "{ hello(name: \"karam\") }";

    let res = schema.execute(query).await;

    println!("{}", res.data.into_json().unwrap());

    Ok(())
}
