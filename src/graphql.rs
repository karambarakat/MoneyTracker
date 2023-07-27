// pub mod mutation {
//     use async_graphql::*;
//     pub struct Mutation;
// }

pub mod query {
    use async_graphql::*;

    use crate::models::User;

    #[derive(Default)]
    pub struct Query {}

    #[derive(Default)]
    pub struct myData {
        pub name: String,
    }

    #[Object]
    impl Query {
        async fn add(&self, a: i32, b: i32) -> i32 {
            a + b
        }

        // async fn profile<'ctx>(&self, ctx: &Context<'ctx>) -> Result<&'ctx myData> {
        //     ctx.data::<myData>().clone()
        // }

        async fn borrow_from_context_data<'ctx>(
            &self,
            ctx: &Context<'ctx>,
        ) -> Result<&'ctx String> {
            ctx.data::<String>()
        }
    }

    #[derive(Default, SimpleObject)]
    struct Profile {
        a: Option<i32>,
        b: i32,
        c: i32,
    }
}

pub mod with_actix;
