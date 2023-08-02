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
`mongodb::Cursor<category::Entry>: futures_util::Stream`
which is required by `mongodb::Cursor<category::Entry>: StreamExt`rustcClick for full compiler diagnostic
mod.rs(103, 1): doesn't satisfy `_: Stream`
mod.rs(103, 1): doesn't satisfy `mongodb::Cursor<category::Entry>: StreamExt
```

I had to bring futures_util::StreamExt into scope to get rust to recognize the next method, but then I had to run `cargo add futures` to fix this issue
*/

use async_graphql::*;
use futures::StreamExt;

use bson::oid::ObjectId;

use mongodb::bson::doc;
use mongodb::Database;

use crate::models::category::*;

#[derive(Default)]
pub struct CategoryQuery {}

#[Object]
impl CategoryQuery {
    async fn get_all_categories(&self, ctx: &Context<'_>) -> Vec<Category> {
        let mut cursor = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<CategoryDB>("category")
            .find(None, None)
            .await
            .unwrap();

        let mut vector = Vec::new();

        while let Some(category) = cursor.next().await {
            vector.push(category.unwrap().into());
        }

        vector
    }

    async fn get_one_category(&self, ctx: &Context<'_>, id: ID) -> Category {
        let id = ObjectId::parse_str(id.to_string()).unwrap();

        let category = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<CategoryDB>("category")
            .find_one(doc! { "_id": id }, None)
            .await
            .unwrap()
            .unwrap();

        category.into()
    }
}

#[derive(Default)]
pub struct CategoryMutation;

#[Object]
impl CategoryMutation {
    async fn create_one_category(&self, ctx: &Context<'_>, category: CategoryInput) -> Category {
        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<CategoryInput>("category")
            .insert_one(category.clone(), None)
            .await
            .unwrap();

        category.to_base(res.inserted_id)
    }

    async fn create_many_categories(
        &self,
        ctx: &Context<'_>,
        categories: Vec<CategoryInput>,
    ) -> Vec<Category> {
        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<CategoryInput>("category")
            .insert_many(categories.clone(), None)
            .await
            .unwrap();

        categories
            .into_iter()
            .enumerate()
            .map(|(i, category)| category.to_base(res.inserted_ids.get(&i).unwrap().clone()))
            .collect()
    }

    async fn update_one_category(&self, ctx: &Context<'_>, category: CategoryUpdate) -> u64 {
        let _id = ObjectId::parse_str(category._id.to_string()).unwrap();

        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<CategoryUpdate>("category")
            .update_one(
                doc! { "_id": _id },
                doc! { "$set": category.to_bson() },
                None,
            )
            .await;

        res.unwrap().modified_count
    }

    async fn delete_one_category(&self, ctx: &Context<'_>, id: ID) -> u64 {
        let id = ObjectId::parse_str(id.to_string()).unwrap();

        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<CategoryUpdate>("category")
            .delete_one(doc! { "_id": id }, None)
            .await;

        res.unwrap().deleted_count
    }

    async fn delete_many_categories(&self, ctx: &Context<'_>, id: Vec<ID>) -> u64 {
        let ids: Vec<ObjectId> = id
            .into_iter()
            .map(|id| ObjectId::parse_str(id.to_string()).unwrap())
            .collect();

        let res = ctx
            .data::<Database>()
            .expect("no client?")
            .collection::<CategoryUpdate>("category")
            .delete_many(doc! { "_id": { "$in": ids } }, None)
            .await;

        res.unwrap().deleted_count
    }
}
