use async_graphql::*;

#[derive(Default, SimpleObject, InputObject)]
pub struct Category {
    pub _id: ID,
    pub color: Option<String>,
    pub icon: Option<String>,
    pub title: String,
}
