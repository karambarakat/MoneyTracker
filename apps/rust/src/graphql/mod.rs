mod category;
mod entry;
mod user;

pub mod root {

    mod say_hi {
        use async_graphql::*;
        use rust_decimal::Decimal;
        use sqlx::postgres::PgRow;
        use sqlx::Row;

        use crate::modules::numeric::Numeric;

        #[derive(Default)]
        pub struct SayHi {}

        #[derive(Clone, SimpleObject, InputObject)]
        #[graphql(input_name = "MyObjInput")]
        pub struct Testing {
            pub mem: Numeric,
        }

        impl sqlx::FromRow<'_, PgRow> for Testing {
            fn from_row(row: &PgRow) -> Result<Self, sqlx::Error> {
                let mem: Decimal = row.try_get("mem")?;
                let mem = Numeric(mem);

                let entry = Testing { mem };

                Ok(entry)
            }
        }

        #[Object]
        impl SayHi {
            async fn say_hi(&self, ctx: &Context<'_>, test: Testing) -> Testing {
                let pool = ctx
                    .data::<sqlx::Pool<sqlx::Postgres>>()
                    .expect("app configured incorrectly");

                let res = sqlx::query_as::<_, Testing>(
                    r#"
                    INSERT INTO test_table (mem)
                    VALUES ($1)
                    returning mem;
                    "#,
                )
                .bind(test.mem.0)
                .fetch_one(pool)
                .await
                .unwrap();

                res
            }
        }
    }

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Query(
        super::category::CategoryQuery,
        super::user::UserQuery,
        super::entry::EntryQuery,
    );

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Mutation(
        say_hi::SayHi,
        super::category::CategoryMutation,
        super::user::UserMutation,
        super::entry::EntryMutation,
    );
}

use actix_web::{
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
