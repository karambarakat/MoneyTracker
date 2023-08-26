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

use crate::errors::bearer_token_error::BearerTokenErr;

impl Jwt {
    pub fn validate(str: &str) -> anyhow::Result<Self> {
        let env = std::env::var("JWT_SALT").expect("JWT_SALT is not set");

        let key: Hmac<Sha256> = Hmac::new_from_slice(env.as_bytes())?;

        let claims: BTreeMap<String, String> = str.verify_with_key(&key)?;

        let exp = claims.get("exp");

        let exp = match exp {
            Some(exp) => {
                // test if expirted
                let exp = exp.parse::<i64>()?;
                let exp =
                    DateTime::<Utc>::from_utc(chrono::NaiveDateTime::from_timestamp(exp, 0), Utc);

                if exp < Utc::now() {
                    return Err(BearerTokenErr::Expired.into());
                }

                exp
            }
            None => return Err(BearerTokenErr::Expired.into()),
        };

        Ok(Self {
            id: claims.get("id").unwrap().to_string(),
            email: claims.get("email").unwrap().to_string(),
            user_id: claims.get("user_id").unwrap().to_string(),
            exp,
            iat: DateTime::<Utc>::from_utc(
                chrono::NaiveDateTime::from_timestamp(
                    claims.get("iat").unwrap().parse::<i64>()?,
                    0,
                ),
                Utc,
            ),
        })
    }

    pub fn sign(id: &str, email: &str, user_id: &str) -> anyhow::Result<String> {
        let env = std::env::var("JWT_SALT").expect("JWT_SALT is not set");

        let key: Hmac<Sha256> = Hmac::new_from_slice(env.as_bytes())?;

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

        let token_str = claims.sign_with_key(&key)?;

        Ok(token_str)
    }
}

impl std::fmt::Display for Jwt {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "[User: {},****]", self.email)
    }
}
