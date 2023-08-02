use std::borrow::Cow;

use async_graphql::*;
use bson::Bson;
// use futures_util::StreamExt;

use mongodb::bson::doc;

use serde::{Deserialize, Serialize};

// #[derive(Clone, Debug, Deserialize, Serialize, Default)]
// struct MyID(pub String);

// // implement display
// impl std::fmt::Display for MyID {
//     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
//         write!(f, "{}", self)
//     }
// }

// impl From<async_graphql::ID> for MyID {
//     fn from(id: ID) -> Self {
//         MyID(id.to_string())
//     }
// }

// impl From<mongodb::bson::oid::ObjectId> for MyID {
//     fn from(id: mongodb::bson::oid::ObjectId) -> Self {
//         MyID(id.to_hex())
//     }
// }

// #[async_trait::async_trait]
// impl OutputType for MyID {
//     fn type_name() -> Cow<'static, str> {
//         <ID as async_graphql::OutputType>::type_name()
//     }

//     fn create_type_info(registry: &mut async_graphql::registry::Registry) -> String {
//         <ID as async_graphql::OutputType>::create_type_info(registry)
//     }

//     async fn resolve(
//         &self,
//         ctx: &ContextSelectionSet<'_>,
//         field: &Positioned<async_graphql::parser::types::Field>,
//     ) -> ServerResult<Value> {
//         async_graphql::ID::resolve(&self.into(), ctx, field).await
//     }
// }

// #[derive(Default, SimpleObject, Serialize, Deserialize)]
// struct EntryTest {
//     #[serde(with = "crate::oidser")]
//     pub _id: ID,
//     pub color: Option<String>,
//     pub icon: Option<String>,
//     pub title: String,
// }

#[derive(Default, SimpleObject)]
pub struct Entry {
    pub _id: ID,
    pub title: String,
    pub amount: i32,
    pub color: Option<String>,
    pub category: Option<ID>,
}

#[derive(Default, SimpleObject)]
pub struct EntryAgg {
    pub _id: ID,
    pub title: String,
    pub amount: i32,
    pub color: Option<String>,
    pub category: Option<Vec<EntryAggC>>,
}

#[derive(Default, SimpleObject)]
pub struct EntryAggC {
    pub _id: ID,
    pub color: Option<String>,
    pub icon: Option<String>,
    pub title: String,
}

#[derive(Default, Deserialize, Serialize)]
pub struct EntryDB {
    pub _id: mongodb::bson::oid::ObjectId,
    pub title: String,
    pub amount: i32,
    pub color: Option<String>,
    pub category: Option<mongodb::bson::oid::ObjectId>,
}

// from EntryDB to Entry
impl Into<Entry> for EntryDB {
    fn into(self) -> Entry {
        Entry {
            _id: ID(self._id.to_hex()).into(),
            title: self.title,
            amount: self.amount,
            color: self.color,
            category: self.category.map(|c| ID(c.to_hex().into())),
        }
    }
}

#[derive(InputObject, Clone, Deserialize, Serialize)]
pub struct EntryInput {
    pub title: String,
    pub amount: i32,
    pub color: Option<String>,
    pub category: Option<ID>,
}

// convert from entry input to entry
impl EntryInput {
    pub fn to_base(self, id: Bson) -> Entry {
        Entry {
            _id: ID(id.as_object_id().unwrap().to_hex()).into(),
            title: self.title,
            amount: self.amount,
            color: self.color,
            category: self.category,
        }
    }
}

#[derive(InputObject, Clone, Deserialize, Serialize)]
pub struct EntryUpdate {
    pub _id: ID,
    pub title: Option<String>,
    pub amount: Option<i32>,
    pub color: Option<String>,
    pub category: Option<ID>,
}

// implement update to bson
impl EntryUpdate {
    pub fn to_bson(&self) -> bson::Document {
        let mut doc = doc! {};

        if let Some(title) = &self.title {
            doc.insert("title", title);
        }

        if let Some(amount) = &self.amount {
            doc.insert("amount", amount);
        }

        if let Some(color) = &self.color {
            doc.insert("color", color);
        }

        if let Some(category) = &self.category {
            doc.insert(
                "category",
                mongodb::bson::oid::ObjectId::parse_str(category.to_string()).unwrap(),
            );
        }

        doc
    }
}
