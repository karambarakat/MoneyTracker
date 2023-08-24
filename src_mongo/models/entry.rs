use std::{borrow::Cow, ffi::c_long, string};

use async_graphql::*;
use bson::{Bson, Document};
// use futures_util::StreamExt;

use mongodb::bson::doc;

use serde::{Deserialize, Serialize};

use super::category::Category;

#[derive(Default, SimpleObject)]
pub struct Entry {
    pub _id: ID,
    pub title: String,
    pub amount: i32,
    pub notes: Option<String>,
    pub category: Option<Box<crate::models::category::Category>>,
}

#[derive(Default, SimpleObject)]
pub struct EntryInserted {
    pub _id: ID,
    pub title: String,
    pub amount: i32,
    pub notes: Option<String>,
    pub category: Option<EntryInsertedRelation>,
}

#[derive(Default, SimpleObject)]
pub struct EntryInsertedRelation {
    _id: ID,
}

impl From<bson::Document> for Entry {
    fn from(value: bson::Document) -> Self {
        Entry {
            _id: match value.get("_id").expect("invalid data: _id missing") {
                Bson::ObjectId(t) => ID(t.to_hex()),
                _ => panic!("invalid data: _id is not objectID"),
            },
            title: match value.get("title").expect("invalid data: title missing") {
                Bson::String(t) => t.to_string(),
                _ => panic!("invalid data: title is not string"),
            },
            amount: match value.get("amount").expect("invalid data: amount missing") {
                Bson::Int32(t) => *t,
                _ => panic!("invalid data: amount is not number"),
            },
            notes: match value.get("notes") {
                Some(Bson::String(t)) => Some(t.to_string()),
                None => None,
                Some(Bson::Null) => None,
                _ => panic!("invalid data: notes is not string"),
            },
            category: match value.get("category") {
                None => None,             // unreachable
                Some(Bson::Null) => None, // unreachable
                Some(Bson::Array(t)) => {
                    if t.len() > 1 {
                        panic!("in one to many relationship I expect only one item")
                    }

                    match t.get(0) {
                        Some(bson) => Some(Box::new(bson.as_document().unwrap().to_owned().into())),
                        None => None, // when null
                    }
                }
                _ => panic!("invalid data: category is not relationship"),
            },
        }
    }
}

#[derive(Default, Deserialize, Serialize)]
pub struct EntryDB {
    pub _id: mongodb::bson::oid::ObjectId,
    pub title: String,
    pub amount: i32,
    pub notes: Option<String>,
    pub category: Option<mongodb::bson::oid::ObjectId>,
}

#[derive(InputObject, Clone, Deserialize, Serialize)]
pub struct EntryInput {
    pub title: String,
    pub amount: i32,
    pub notes: Option<String>,
    pub category: Option<ID>,
}

#[derive(Default, Deserialize, Serialize)]
pub struct EntryInputDB {
    pub title: String,
    pub amount: i32,
    pub notes: Option<String>,
    pub category: Option<mongodb::bson::oid::ObjectId>,
}

impl EntryInputDB {
    pub fn fromG(value: EntryInput) -> Self {
        EntryInputDB {
            title: value.title,
            amount: value.amount,
            notes: value.notes,
            category: value.category.map_or(None, |v| {
                Some(mongodb::bson::oid::ObjectId::parse_str(v.as_str()).unwrap())
            }),
        }
    }
}

// convert from entry input to entry
impl EntryInput {
    pub fn insert(&self) -> bson::Document {
        doc! {}
    }
    pub fn inserted(self, id: Bson) -> EntryInserted {
        EntryInserted {
            _id: ID(id.as_object_id().unwrap().to_hex()).into(),
            title: self.title,
            amount: self.amount,
            notes: self.notes,
            category: self
                .category
                .map_or(None, |t| Some(EntryInsertedRelation { _id: t })),
        }
    }
}

#[derive(InputObject, Clone, Deserialize, Serialize)]
pub struct EntryUpdate {
    pub _id: ID,
    pub title: Option<String>,
    pub amount: Option<i32>,
    pub notes: Option<String>,
    pub category: Option<ID>,
}

// implement update to bson
impl EntryUpdate {
    pub fn into_doc(&self) -> bson::Document {
        let mut doc = doc! {};

        if let Some(title) = &self.title {
            doc.insert("title", title);
        }

        if let Some(amount) = &self.amount {
            doc.insert("amount", amount);
        }

        if let Some(notes) = &self.notes {
            doc.insert("notes", notes);
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
