use std::vec;

use async_graphql::*;
use futures::stream::StreamExt;

use crate::models::entry::*;
use serde::{Deserialize, Serialize};

#[derive(Default)]
pub struct EntryQuery;

#[Object]
impl EntryQuery {
    async fn get_all_entries(&self, ctx: &Context<'_>) -> Vec<Entry> {
        vec![Entry::default()]
    }

    // async fn get_one_entry(&self, ctx: &Context<'_>, id: ID) -> Entry {
    //     let id = ObjectId::parse_str(id.to_string()).unwrap();

    //     let mut cursor = ctx
    //         .data::<Database>()
    //         .expect("no client?")
    //         .collection::<EntryDB>("entry")
    //         .aggregate(
    //             vec![
    //                 doc! {
    //                     "$match": {
    //                         "_id": id,
    //                     },
    //                 },
    //                 doc! {
    //                     "$lookup": {
    //                         "from": "category",
    //                         "localField": "category",
    //                         "foreignField": "_id",
    //                         "as": "category",
    //                     },
    //                 },
    //             ],
    //             None,
    //         )
    //         .await
    //         .unwrap();

    //     Entry::from(cursor.next().await.unwrap().unwrap())
    // }
}

#[derive(Default)]
pub struct EntryMutation;

#[Object]
impl EntryMutation {
    // async fn create_one_entry(&self, ctx: &Context<'_>, entry: EntryInput) -> EntryInserted {
    async fn create_one_entry(&self, ctx: &Context<'_>) -> Entry {
        Entry::default()
    }

    //     async fn create_many_entries(
    //         &self,
    //         ctx: &Context<'_>,
    //         entries: Vec<EntryInput>,
    //     ) -> Vec<EntryInserted> {
    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<EntryInputDB>("entry")
    //             .insert_many(
    //                 entries
    //                     .clone()
    //                     .iter()
    //                     .map(|entry| EntryInputDB::fromG(entry.to_owned()))
    //                     .collect::<Vec<EntryInputDB>>(),
    //                 None,
    //             )
    //             .await
    //             .unwrap();

    //         entries
    //             .into_iter()
    //             .enumerate()
    //             .map(|(i, entry)| entry.inserted(res.inserted_ids.get(&i).unwrap().clone()))
    //             .collect()
    //     }

    //     async fn update_one_entry(&self, ctx: &Context<'_>, entry: EntryUpdate) -> u64 {
    //         let _id = ObjectId::parse_str(entry._id.to_string()).unwrap();

    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<EntryUpdate>("entry")
    //             .update_one(doc! { "_id": _id }, doc! { "$set": entry.into_doc() }, None)
    //             .await;

    //         res.unwrap().modified_count
    //     }

    //     async fn delete_one_entry(&self, ctx: &Context<'_>, id: ID) -> u64 {
    //         let id = ObjectId::parse_str(id.to_string()).unwrap();

    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<EntryUpdate>("entry")
    //             .delete_one(doc! { "_id": id }, None)
    //             .await;

    //         res.unwrap().deleted_count
    //     }

    //     async fn delete_many_entries(&self, ctx: &Context<'_>, id: Vec<ID>) -> u64 {
    //         let ids: Vec<ObjectId> = id
    //             .into_iter()
    //             .map(|id| ObjectId::parse_str(id.to_string()).unwrap())
    //             .collect();

    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<EntryUpdate>("entry")
    //             .delete_many(doc! { "_id": { "$in": ids } }, None)
    //             .await;

    //         res.unwrap().deleted_count
    //     }
}
