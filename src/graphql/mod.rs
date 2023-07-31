mod entry;

pub mod root {
    use async_graphql::*;

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Query(super::entry::CategoryQuery, EmptyMutation);

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Mutation(super::entry::EntryMutation, EmptyMutation);
}

pub mod with_actix {
    use actix_web::{get, post, web, HttpResponse};
    use async_graphql::{EmptySubscription, Schema};
    use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

    use super::root::{Mutation, Query};

    #[post("")]
    pub async fn graphql_endpoint(
        schema: web::Data<Schema<Query, Mutation, EmptySubscription>>,
        req: GraphQLRequest,
    ) -> GraphQLResponse {
        schema.execute(req.into_inner()).await.into()
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
}
