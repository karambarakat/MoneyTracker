mod user_query {
    use async_graphql::*;

    #[derive(Default, SimpleObject)]
    struct Profile {
        _id: ID,
        display_name: Option<i32>,
        email: i32,
        password: i32,
    }

    #[derive(Default)]
    pub struct ProfileQuery {}
    #[Object]
    impl ProfileQuery {
        async fn profile(&self, ctx: &Context<'_>) -> Profile {
            Profile::default()
        }
    }

    pub struct Mutation;

    #[Object]
    impl Mutation {
        async fn login(&self, ctx: &Context<'_>, name: String, author: String) -> String {
            format!("{name}, {author}")
        }

        async fn signup(&self, ctx: &Context<'_>, id: ID) -> Result<bool> {
            Ok(true)
        }

        // update profile
        async fn update_profile(&self, ctx: &Context<'_>, id: ID) -> Result<bool> {
            Ok(true)
        }
    }
}

pub mod Root {
    use async_graphql::*;
    use mongodb::{Client, Database};

    use crate::models::User;

    #[derive(Default)]
    struct ExQuery {}
    #[Object]
    impl ExQuery {
        async fn say_hi(&self, name: String) -> String {
            format!("Hi, {}!", name)
        }
        async fn borrow_from_context_data<'ctx>(
            &self,
            ctx: &Context<'ctx>,
        ) -> Result<&'ctx String> {
            ctx.data::<String>()
        }
    }

    #[derive(MergedObject, Default)]
    pub struct Query(super::user_query::ProfileQuery, ExQuery);

    #[derive(Default)]
    struct MutationEx;

    #[Object]
    impl MutationEx {
        async fn mutate(&self, ctx: &Context<'_>, author: Option<String>) -> String {
            let res = ctx
                .data::<Database>()
                .expect("no client?")
                .run_command(mongodb::bson::doc! {"ping": 1}, None)
                .await;

            let res: String = match res {
                // Ok(res) => format!("{}", res.get_str("ok").unwrap_or("error")),
                Ok(res) => format!(
                    "{}, {}",
                    res.keys().next().unwrap(),
                    res.values().next().unwrap(),
                ),

                Err(e) => "error".to_string(),
            };

            format!("{}, {res}", author.unwrap_or("no author".to_string()))
        }
    }

    #[derive(MergedObject, Default)]
    pub struct Mutation(EmptyMutation, MutationEx);
}

pub mod with_actix {
    use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};
    use async_graphql::{EmptySubscription, Schema};
    use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

    use super::Root::{Mutation, Query};

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
