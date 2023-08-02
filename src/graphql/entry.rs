// helpfull info for my future self
//    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
//    released: chrono::DateTime<Utc>,
/* serialize datetime
    #[derive(Serialize, Deserialize)]
    struct Obj {
        #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
        released: chrono::DateTime<Utc>,
    }

*/
/*

this code `cursor.next()` was throwing this error
```
the method `next` exists for struct `Cursor<Entry>`, but its trait bounds were not satisfied
the following trait bounds were not satisfied:
`mongodb::Cursor<entry::Entry>: futures_util::Stream`
which is required by `mongodb::Cursor<entry::Entry>: StreamExt`rustcClick for full compiler diagnostic
mod.rs(103, 1): doesn't satisfy `_: Stream`
mod.rs(103, 1): doesn't satisfy `mongodb::Cursor<entry::Entry>: StreamExt
```

I had to bring futures_util::StreamExt into scope to get rust to recognize the next method, but then I had to run `cargo add futures` to fix this issue
*/

use async_graphql::*;
use futures::stream::StreamExt;

use bson::oid::ObjectId;

use mongodb::bson::doc;
use mongodb::Database;

use crate::models::entry::*;
use serde::{Deserialize, Serialize};

#[derive(Default)]
pub struct EntryQuery {}

#[derive(Default, SimpleObject)]
struct CategoryPop {
    pub color: Option<String>,
    pub icon: Option<String>,
    pub title: String,
}

#[derive(Default, SimpleObject)]
struct EntryPop {
    _id: ID,
    title: String,
    amount: i32,
    category: Vec<CategoryPop>,
}

#[derive(Default, Serialize, Deserialize)]
struct EntryPopDB {
    _id: ObjectId,
    title: String,
    amount: i32,
    category: Option<Vec<String>>,
}

#[Object]
impl EntryQuery {
    async fn get_all_entries(&self, ctx: &Context<'_>) -> Vec<EntryPop> {
        let mut cursor = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<EntryDB>("entry")
            .aggregate(
                vec![doc! {
                    "$lookup": {
                        "from": "categories",
                        "localField": "category",
                        "foreignField": "_id",
                        "as": "category",
                    },
                }],
                None,
            )
            .await
            .unwrap();

        let mut vector = Vec::new();

        // while let Some(entry) = cursor.next().await {
        //     vector.push(entry.unwrap().into());
        // }

        vector
    }

    async fn get_one_entry(&self, ctx: &Context<'_>, id: ID) -> EntryAgg {
        let id = ObjectId::parse_str(id.to_string()).unwrap();

        let entry = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<EntryDB>("entry")
            .aggregate(
                vec![doc! {
                    "$lookup": {
                        "from": "categories",
                        "localField": "category",
                        "foreignField": "_id",
                        "as": "category",
                    },
                }],
                None,
            )
            .await
            .unwrap();

        let mut res: Vec<EntryAgg> = Vec::new();

        while let Some(category) = entry.next().await {
            res.push(category.unwrap());
        }

        println!("{:?}", res);

        let cat = EntryAggC {
            _id: "sdf".into(),
            title: "sdfs".to_string(),
            color: None,
            icon: None,
        };

        EntryAgg {
            _id: "sdf".into(),
            title: "sdfs".to_string(),
            amount: 23,
            color: Some("sdf".to_string()),
            category: Some(vec![cat]),
        }
    }
}

#[derive(Default)]
pub struct EntryMutation;

#[Object]
impl EntryMutation {
    async fn create_one_entry(&self, ctx: &Context<'_>, entry: EntryInput) -> Entry {
        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<EntryInput>("entry")
            .insert_one(entry.clone(), None)
            .await
            .unwrap();

        entry.to_base(res.inserted_id)
    }

    async fn create_many_entries(&self, ctx: &Context<'_>, entries: Vec<EntryInput>) -> Vec<Entry> {
        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<EntryInput>("entry")
            .insert_many(entries.clone(), None)
            .await
            .unwrap();

        entries
            .into_iter()
            .enumerate()
            .map(|(i, entry)| entry.to_base(res.inserted_ids.get(&i).unwrap().clone()))
            .collect()
    }

    async fn update_one_entry(&self, ctx: &Context<'_>, entry: EntryUpdate) -> u64 {
        let _id = ObjectId::parse_str(entry._id.to_string()).unwrap();

        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<EntryUpdate>("entry")
            .update_one(doc! { "_id": _id }, doc! { "$set": entry.to_bson() }, None)
            .await;

        res.unwrap().modified_count
    }

    async fn delete_one_entry(&self, ctx: &Context<'_>, id: ID) -> u64 {
        let id = ObjectId::parse_str(id.to_string()).unwrap();

        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<EntryUpdate>("entry")
            .delete_one(doc! { "_id": id }, None)
            .await;

        res.unwrap().deleted_count
    }

    async fn delete_many_entries(&self, ctx: &Context<'_>, id: Vec<ID>) -> u64 {
        let ids: Vec<ObjectId> = id
            .into_iter()
            .map(|id| ObjectId::parse_str(id.to_string()).unwrap())
            .collect();

        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<EntryUpdate>("entry")
            .delete_many(doc! { "_id": { "$in": ids } }, None)
            .await;

        res.unwrap().deleted_count
    }
}
