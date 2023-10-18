//! generate graphql schema.json

extern crate backend;

use async_graphql::{EmptySubscription, Schema};

use serde_json::json;

#[tokio::main]
async fn main() {
    let schema = Schema::build(
        backend::graphql::root::Query::default(),
        backend::graphql::root::Mutation::default(),
        EmptySubscription,
    )
    .finish();

    let result = schema
        .execute(
            r#"
    query  {
        __schema {
          queryType {
            name
          }
          mutationType {
            name
          }
          subscriptionType {
            name
          }
          types {
            ...FullType
          }
          directives {
            name
            description
      
            locations
            args {
              ...InputValue
            }
          }
        }
      }
      
      fragment FullType on __Type {
        kind
        name
        description
      
        fields(includeDeprecated: true) {
          name
          description
          args {
            ...InputValue
          }
          type {
            ...TypeRef
          }
          isDeprecated
          deprecationReason
        }
        inputFields {
          ...InputValue
        }
        interfaces {
          ...TypeRef
        }
        enumValues(includeDeprecated: true) {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          ...TypeRef
        }
      }
      
      fragment InputValue on __InputValue {
        name
        description
        type {
          ...TypeRef
        }
        defaultValue
      }
      
      fragment TypeRef on __Type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
      
    "#,
        )
        .await;

    // output to file "schema.json"
    std::fs::write("pkgs/types/schema.json", json!(result).to_string()).unwrap();
}
