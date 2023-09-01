pub struct Jwt {
    pub id: String,
    pub email: String,
    pub user_id: String,
    pub exp: DateTime<Utc>,
    pub iat: DateTime<Utc>,
}
use chrono::DateTime;
use chrono::Duration;
use chrono::Utc;
use hmac::{Hmac, Mac};
use jwt::SignWithKey;
use jwt::VerifyWithKey;
use sha2::Sha256;
use std::collections::BTreeMap;

use crate::errors::MyErrors;

impl Jwt {
    pub fn validate(str: &str) -> Result<Self, MyErrors> {
        let env = std::env::var("JWT_SALT").expect("JWT_SALT is not set");

        let key: Hmac<Sha256> = Hmac::new_from_slice(env.as_bytes())
            .map_err(|err| MyErrors::InternalError(Box::new(err)))?;

        let claims: BTreeMap<String, String> = str
            .verify_with_key(&key)
            .map_err(|err| MyErrors::InternalError(Box::new(err)))?;

        let exp = claims.get("exp");

        let exp = match exp {
            Some(exp) => {
                // test if expirted
                let exp = exp
                    .parse::<i64>()
                    .map_err(|err| MyErrors::InternalError(Box::new(err)))?;
                let exp = DateTime::<Utc>::from_utc(
                    chrono::NaiveDateTime::from_timestamp_opt(exp, 0).unwrap(),
                    Utc,
                );

                if exp < Utc::now() {
                    return Err(MyErrors::ExpiredBearerToken);
                }

                exp
            }
            None => return Err(MyErrors::ExpiredBearerToken),
        };

        Ok(Self {
            id: claims.get("id").unwrap().to_string(),
            email: claims.get("email").unwrap().to_string(),
            user_id: claims.get("user_id").unwrap().to_string(),
            exp,
            iat: DateTime::<Utc>::from_utc(
                chrono::NaiveDateTime::from_timestamp_opt(
                    claims
                        .get("iat")
                        .unwrap()
                        .parse::<i64>()
                        .map_err(|err| MyErrors::InternalError(Box::new(err)))?,
                    0,
                )
                .unwrap(),
                Utc,
            ),
        })
    }

    pub fn sign(id: &str, email: &str, user_id: &str) -> Result<String, MyErrors> {
        let env = std::env::var("JWT_SALT").expect("JWT_SALT is not set");

        let key: Hmac<Sha256> = Hmac::new_from_slice(env.as_bytes())
            .map_err(|err| MyErrors::InternalError(Box::new(err)))?;

        let claims = {
            let mut claims: BTreeMap<String, String> = BTreeMap::new();

            let now = Utc::now();
            let exp = now + Duration::days(1);

            claims.insert("id".to_string(), id.to_string());
            claims.insert("email".to_string(), email.to_string());
            claims.insert("user_id".to_string(), user_id.to_string());
            claims.insert("exp".to_string(), exp.timestamp().to_string());
            claims.insert("iat".to_string(), now.timestamp().to_string());

            claims
        };

        let token_str = claims
            .sign_with_key(&key)
            .map_err(|err| MyErrors::InternalError(Box::new(err)))?;

        Ok(token_str)
    }
}

impl std::fmt::Display for Jwt {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "[User: {},****]", self.email)
    }
}
