use async_graphql::*;

#[derive(Default, SimpleObject, InputObject)]
pub struct Entry {
    pub _id: ID,
    pub title: String,
    pub amount: i32,
    pub notes: Option<String>,
    pub category: Option<Box<crate::models::category::Category>>,
}
