mod user {
    use async_graphql::*;

    #[derive(Default, SimpleObject)]
    struct Profile {
        _id: ID,
        display_name: Option<i32>,
        email: i32,
        password: i32,
    }

    #[derive(Default)]
    pub struct ProfileQuery {}
    #[Object]
    impl ProfileQuery {
        async fn profile(&self, ctx: &Context<'_>) -> Profile {
            Profile::default()
        }
    }

    #[derive(Default)]
    pub struct ProfileMutation;

    #[Object]
    impl ProfileMutation {
        async fn login(&self, ctx: &Context<'_>, name: String, author: String) -> String {
            format!("{name}, {author}")
        }

        async fn signup(&self, ctx: &Context<'_>, id: ID) -> Result<bool> {
            Ok(true)
        }

        // update profile
        async fn update_profile(&self, ctx: &Context<'_>, id: ID) -> Result<bool> {
            Ok(true)
        }
    }
}

mod entry {
    use async_graphql::futures_util::io::Cursor;
    use async_graphql::*;
    use bson::Bson;

    use bson::oid::ObjectId;
    use mongodb::bson::doc;
    use mongodb::Database;

    #[derive(Default, SimpleObject)]
    struct Entry {
        _id: ID,
        color: Option<String>,
        icon: Option<String>,
        title: String,
    }

    #[derive(InputObject, Clone, serde::Deserialize, serde::Serialize)]
    struct EntryInput {
        color: Option<String>,
        icon: Option<String>,
        title: String,
    }

    // convert from entry input to entry
    impl EntryInput {
        fn to_entry(&self, id: Bson) -> Entry {
            Entry {
                _id: ID(id.as_object_id().unwrap().to_hex()),
                color: self.color.clone(),
                icon: self.icon.clone(),
                title: self.title.clone(),
            }
        }
    }

    #[derive(InputObject, Clone, serde::Deserialize, serde::Serialize)]
    struct EntryUpdate {
        id: ID,
        color: Option<String>,
        icon: Option<String>,
        title: Option<String>,
    }

    // implement update to bson
    impl EntryUpdate {
        fn to_bson(&self) -> bson::Document {
            let mut doc = doc! {};

            if let Some(color) = &self.color {
                doc.insert("color", color);
            }

            if let Some(icon) = &self.icon {
                doc.insert("icon", icon);
            }

            if let Some(title) = &self.title {
                doc.insert("title", title);
            }

            println!("{:?}", doc);

            doc
        }
    }

    #[derive(Default)]
    pub struct EntryQuery {}
    #[Object]
    impl EntryQuery {
        async fn get_all_entries(&self, ctx: &Context<'_>) -> Vec<Entry> {
            let cursor = ctx
                .data::<Database>()
                .expect("no client?")
                .collection::<Entry>("entries")
                .find(None, None)
                .await
                .unwrap();

            let res = vec![];

            // while let Some(Ok(result)) = cursor.next().await {
            //     res.push(result);
            // }

            res
        }

        async fn get_one_entry(&self, ctx: &Context<'_>, id: ID) -> Entry {
            Entry::default()
        }

        async fn get_many_entries(&self, ctx: &Context<'_>, id: ID) -> Vec<Entry> {
            vec![Entry::default(), Entry::default()]
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
                .collection::<EntryInput>("entries")
                .insert_one(entry.clone(), None)
                .await
                .unwrap();

            entry.to_entry(res.inserted_id)
        }

        async fn create_many_entries(
            &self,
            ctx: &Context<'_>,
            entries: Vec<EntryInput>,
        ) -> Vec<Entry> {
            let res = ctx
                .data::<Database>()
                .expect("no client?")
                .collection::<EntryInput>("entries")
                .insert_many(entries.clone(), None)
                .await
                .unwrap();

            entries
                .into_iter()
                .enumerate()
                .map(|(i, entry)| entry.to_entry(res.inserted_ids.get(&i).unwrap().clone()))
                .collect()
        }

        async fn update_one_entry(&self, ctx: &Context<'_>, entry: EntryUpdate) -> u64 {
            let id = ObjectId::parse_str(entry.id.to_string()).unwrap();

            let res = ctx
                .data::<Database>()
                .expect("no client?")
                .collection::<EntryUpdate>("entries")
                .update_one(doc! { "_id": id }, doc! { "$set": entry.to_bson() }, None)
                .await;

            res.unwrap().modified_count
        }

        async fn delete_one_entry(&self, ctx: &Context<'_>, id: ID) -> u64 {
            let id = ObjectId::parse_str(id.to_string()).unwrap();

            let res = ctx
                .data::<Database>()
                .expect("no client?")
                .collection::<EntryUpdate>("entries")
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
                .collection::<EntryUpdate>("entries")
                .delete_many(doc! { "_id": { "$in": ids } }, None)
                .await;

            res.unwrap().deleted_count
        }
    }
}

mod example {
    use async_graphql::*;
    use mongodb::Database;

    #[derive(Default)]
    pub struct ExQuery {}
    #[Object]
    impl ExQuery {
        async fn say_hi(&self, name: String) -> String {
            format!("Hi, {}!", name)
        }
        async fn borrow_from_context_data<'ctx>(
            &self,
            ctx: &Context<'ctx>,
        ) -> Result<&'ctx String> {
            ctx.data::<String>()
        }
    }

    #[derive(Default)]
    pub struct MutationEx;

    #[Object]
    impl MutationEx {
        async fn mutate(&self, ctx: &Context<'_>, author: Option<String>) -> String {
            let res = ctx
                .data::<Database>()
                .expect("no client?")
                .run_command(mongodb::bson::doc! {"ping": 1}, None)
                .await;

            let res: String = match res {
                // Ok(res) => format!("{}", res.get_str("ok").unwrap_or("error")),
                Ok(res) => format!(
                    "{}, {}",
                    res.keys().next().unwrap(),
                    res.values().next().unwrap(),
                ),

                Err(e) => "error".to_string(),
            };

            format!("{}, {res}", author.unwrap_or("no author".to_string()))
        }
    }
}

pub mod root {
    use async_graphql::*;

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Query(
        super::user::ProfileQuery,
        super::entry::EntryQuery,
        EmptyMutation,
    );

    #[derive(async_graphql::MergedObject, Default)]
    pub struct Mutation(
        super::user::ProfileMutation,
        super::entry::EntryMutation,
        EmptyMutation,
    );
}

pub mod with_actix {
    use actix_web::{get, post, web, HttpResponse};
    use async_graphql::{EmptySubscription, Schema};
    use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

    use super::root::{Mutation, Query};

    #[post("")]
    pub async fn graphql_endpoint(
        schema: web::Data<Schema<Query, Mutation, EmptySubscription>>,
        req: GraphQLRequest,
    ) -> GraphQLResponse {
        schema.execute(req.into_inner()).await.into()
    }

    #[get("")]
    pub async fn graphql_playground() -> HttpResponse {
        HttpResponse::Ok()
            .content_type("text/html; charset=utf-8")
            .body(
                async_graphql::http::GraphiQLSource::build()
                    .endpoint("/graphql")
                    .finish(),
            )
    }
}
