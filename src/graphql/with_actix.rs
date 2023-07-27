use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use super::query::{myData, Query};

pub fn configuration(cfg: &mut web::ServiceConfig) {
    let schema = Schema::build(Query::default(), EmptyMutation, EmptySubscription)
        .data(myData {
            name: "hi".to_string(),
        })
        .data("hi".to_string())
        .finish();

    cfg.service(
        web::scope("/graphql")
            .app_data(web::Data::new(schema.clone()))
            .service(graphql_playground)
            .service(graphql_endpoint),
    );
}

#[post("")]
pub async fn graphql_endpoint(
    schema: web::Data<Schema<crate::graphql::query::Query, EmptyMutation, EmptySubscription>>,
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
