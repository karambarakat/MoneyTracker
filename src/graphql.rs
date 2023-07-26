pub mod mutation {
    use async_graphql::*;

    pub struct Mutation;
}
pub mod query {
    use async_graphql::*;

    pub struct Query;

    #[Object]
    impl Query {
        /// Returns the sum of a and b
        async fn add(&self, a: i32, b: i32) -> i32 {
            a + b
        }
        async fn hello(&self, name: String) -> String {
            format!("hello {name}")
        }
        async fn simple(&self) -> String {
            "hello".to_string()
        }
    }
}

pub mod with_actix {
    use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};
    use async_graphql::{EmptyMutation, EmptySubscription, Schema};
    use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

    use super::query::Query;

    pub fn configuration(cfg: &mut web::ServiceConfig) {
        let schema = Schema::build(Query, EmptyMutation, EmptySubscription).finish();

        cfg.service(
            web::scope("/graphql")
                .app_data(web::Data::new(schema.clone()))
                // .route("", web::get().to(graphql_endpoint))
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
}
