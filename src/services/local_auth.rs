use actix_web::{
    guard::{Guard, GuardContext},
    *,
};

// deliverables
// - generate jwt token
// - when signup, encrypt password and store in db
// - when login, compare encrypted password with db
// - always generate jwt token

pub mod user_model {

    use serde::{Deserialize, Serialize};
    // #[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]

    use bson::doc;
    use mongodb::{options::IndexOptions, Client, IndexModel};

    pub struct UserInfo {
        display_name: Option<String>,
        photo: Option<String>,
    }

    pub struct UserMeta {
        provider: Vec<String>,
        email: String,
        id: String,
        token: String,
    }

    #[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
    pub struct UserAuth {
        email: String,
        password: String,
    }

    pub async fn db_init(client: &Client) {
        let db = std::env::var("MONDO_DB").expect("no mongo db");

        client
            .database(&db)
            .collection::<crate::models::user_model::UserMeta>("profile")
            .create_index(
                IndexModel::builder()
                    .keys(doc! { "email": 1})
                    .options(IndexOptions::builder().unique(true).build())
                    .build(),
                None,
            )
            .await
            .unwrap();
    }
}

struct EmailPassword<'a> {
    pub email: &'a str,
    password: &'a str,
}

use base64::{engine::general_purpose, Engine as _};

// the input is going to be a base64 encoded string of format `email:password`
impl EmailPassword<'_> {
    fn new<'a>(input: &'a str) -> EmailPassword<'a> {
        let decoded = general_purpose::STANDARD.decode(&input).unwrap();
        let decoded = String::from_utf8(decoded).unwrap();
        let decoded = decoded.split(":").collect::<Vec<&str>>();
        EmailPassword {
            email: decoded[0],
            password: decoded[1],
        }
    }

    // get encrypted password using salt
    pub fn get_pass(&self) -> String {
        let salt = std::env::var("SALT").expect("no salt");
        let salted = format!("{}{}", self.password, salt);
        let encrypted = bcrypt::hash(salted, bcrypt::DEFAULT_COST).unwrap();
        encrypted
    }

    pub fn matchPassword(&self, encrypted: &str) -> bool {
        let salt = std::env::var("SALT").expect("no salt");
        let salted = format!("{}{}", self.password, salt);
        bcrypt::verify(salted, encrypted).unwrap()
    }
}

use actix_web::{dev::Service as _, web, App};
use futures_util::future::FutureExt;
use mongodb::Database;

// make atix config for login and signup
pub fn config(cfg: &mut web::ServiceConfig) {
    let salt = std::env::var("SALT").expect("no salt");

    cfg.service(
        // /login POST
        web::resource("/login")
            // this code have lifetime issue
            // .wrap_fn(|req, srv| {
            //     let authToken = req
            //         .headers()
            //         .get("Authorization")
            //         .unwrap()
            //         .to_str()
            //         .unwrap();
            //     req.extensions_mut().insert(EmailPassword::new(authToken));
            //     srv.call(req)
            // })
            .route(web::post().to(register)),
    )
    .service(
        // /register POST
        web::resource("/register").route(web::post().to(register)), // .route(web::get().to(HttpResponse::MethodNotAllowed)),
    );
}

// login handler
async fn login(req: HttpRequest, db: web::Data<Database>) -> HttpResponse {
    let email_password = req.extensions().get::<EmailPassword>().unwrap();

    let res = db
        .collection::<UserAuth>("profile")
        .find_one(doc! { "email": email_password.email }, None)
        .await
        .unwrap()

    let res = match res {
        Some(res) => {
            let encrypted = res.get_pass();
            if email_password.matchPassword(encrypted) {
                "login"
            } else {
                "wrong password"
            }
        }
        None => "no user",
    };

    HttpResponse::Ok().body(res)
}

use bson::doc;

use self::user_model::UserAuth;

// signup handler
async fn register(req: HttpRequest, db: web::Data<Database>) -> HttpResponse {
    // let email_password = req.extensions_mut().get::<EmailPassword>().unwrap();
    let email_password = req.extensions();
    let email_password = email_password.get::<EmailPassword>().unwrap();

    db.collection("profile")
        .insert_one(
            doc! {
                "email": email_password.email,
                "password": email_password.get_pass(),
            },
            None,
        )
        .await
        .unwrap();

    HttpResponse::Ok().body("register")
}
