mod category;
mod entry;
mod user;

pub mod root {
    use async_graphql::*;

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Query(
        super::category::CategoryQuery,
        super::user::UserQuery,
        super::entry::EntryQuery,
    );

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Mutation(
        super::category::CategoryMutation,
        super::user::UserMutation,
        super::entry::EntryMutation,
    );
}

use std::sync::Arc;

use actix_web::{
    get, post,
    web::{self, ReqData},
    HttpResponse,
};
use async_graphql::{EmptySubscription, Schema};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use root::{Mutation, Query};

pub async fn graphql_endpoint(
    schema: web::Data<Schema<Query, Mutation, EmptySubscription>>,
    user: Option<ReqData<crate::middlewares::user::ReqUser>>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    // this need to be improved
    let user = user.expect("app is configured incorrectly").into_inner();

    let user = user.borrow();

    let user = user
        .as_ref()
        .expect("app is configured incorrectly")
        .clone();

    schema.execute(req.into_inner().data(user)).await.into()
}

pub async fn graphql_playground() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(
            async_graphql::http::GraphiQLSource::build()
                .endpoint("/graphql")
                .finish(),
        )
}
