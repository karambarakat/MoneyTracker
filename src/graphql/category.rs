use async_graphql::*;
use futures::StreamExt;

use crate::models::category::*;

#[derive(Default, SimpleObject)]
struct Category {
    pub _id: ID,
    pub color: Option<String>,
    pub icon: Option<String>,
    pub title: String,
}

#[derive(Default)]
pub struct CategoryQuery {}

#[Object]
impl CategoryQuery {
    async fn get_all_categories(&self, ctx: &Context<'_>) -> Vec<Category> {
        // todo!();
        vec![Category::default()]
    }

    // async fn get_one_category(&self, ctx: &Context<'_>, id: ID) -> Category {
    //     let id = ObjectId::parse_str(id.to_string()).unwrap();

    //     let category = ctx
    //         .data::<Database>()
    //         .expect("no client?")
    //         .collection::<CategoryDB>("category")
    //         .find_one(doc! { "_id": id }, None)
    //         .await
    //         .unwrap()
    //         .unwrap();

    //     category.into()
    // }
}

#[derive(Default)]
pub struct CategoryMutation;

#[Object]
impl CategoryMutation {
    // async fn create_one_category(&self, ctx: &Context<'_>, category: Category) -> Category {
    async fn create_one_category(&self, ctx: &Context<'_>) -> Category {
        // todo!("create_one_category")
        Category::default()
        // let res = ctx
        //     .data::<Database>()
        //     .expect("no client?")
        //     .collection::<CategoryInput>("category")
        //     .insert_one(category.clone(), None)
        //     .await
        //     .unwrap();

        // category.inserted(res.inserted_id)
    }

    //     async fn create_many_categories(
    //         &self,
    //         ctx: &Context<'_>,
    //         categories: Vec<CategoryInput>,
    //     ) -> Vec<Category> {
    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<CategoryInput>("category")
    //             .insert_many(categories.clone(), None)
    //             .await
    //             .unwrap();

    //         categories
    //             .into_iter()
    //             .enumerate()
    //             .map(|(i, category)| category.inserted(res.inserted_ids.get(&i).unwrap().clone()))
    //             .collect()
    //     }

    //     async fn update_one_category(&self, ctx: &Context<'_>, category: CategoryUpdate) -> u64 {
    //         let _id = ObjectId::parse_str(category._id.to_string()).unwrap();

    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<CategoryUpdate>("category")
    //             .update_one(
    //                 doc! { "_id": _id },
    //                 doc! { "$set": category.into_doc() },
    //                 None,
    //             )
    //             .await;

    //         res.unwrap().modified_count
    //     }

    //     async fn delete_one_category(&self, ctx: &Context<'_>, id: ID) -> u64 {
    //         let id = ObjectId::parse_str(id.to_string()).unwrap();

    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<CategoryUpdate>("category")
    //             .delete_one(doc! { "_id": id }, None)
    //             .await;

    //         res.unwrap().deleted_count
    //     }

    //     async fn delete_many_categories(&self, ctx: &Context<'_>, id: Vec<ID>) -> u64 {
    //         let ids: Vec<ObjectId> = id
    //             .into_iter()
    //             .map(|id| ObjectId::parse_str(id.to_string()).unwrap())
    //             .collect();

    //         let res = ctx
    //             .data::<Database>()
    //             .expect("no client?")
    //             .collection::<CategoryUpdate>("category")
    //             .delete_many(doc! { "_id": { "$in": ids } }, None)
    //             .await;

    //         res.unwrap().deleted_count
    //     }
}
