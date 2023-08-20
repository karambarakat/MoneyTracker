mod category;
mod user;

pub mod root {
    use async_graphql::*;

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Query(
        super::category::CategoryQuery,
        super::user::UserQuery,
        EmptyMutation,
    );

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Mutation(
        super::category::CategoryMutation,
        super::user::UserMutation,
        EmptyMutation,
    );
}

use actix_web::{get, post, web, HttpResponse};
use async_graphql::{EmptySubscription, Schema};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use root::{Mutation, Query};

#[post("")]
pub async fn graphql_endpoint(
    schema: web::Data<Schema<Query, Mutation, EmptySubscription>>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    schema
        .execute(req.0.data("pass string data over"))
        .await
        .into()
}

#[get("")]
pub async fn graphql_playground() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(
            async_graphql::http::GraphiQLSource::build()
                .endpoint("/graphql")
                .finish(),
        )
}
