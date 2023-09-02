static RUST_ENV: Option<&'static str> = option_env!("RUST_ENV");
// static RUST_ENV: &str = env!("RUST_ENV");

pub fn load_env() {
    let env = match (cfg!(debug_assertions), cfg!(test)) {
        (true, _) => "dev",
        (false, true) => "test",
        (false, false) => "prod",
    };

    let rust_env = RUST_ENV.unwrap_or(env);

    dotenv::from_filename(format!("apps/rust/.env.{}.local", rust_env)).ok();
    dotenv::from_filename(format!("apps/rust/.env.{}", rust_env)).ok();
    dotenv::from_filename("apps/rust/.env").ok();

    std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");

    std::env::var("JWT_SALT").expect("JWT_SALT is not set");

    std::env::var("SALT").expect("SALT is not set");
    std::env::var("PORT")
        .expect("PORT is not set")
        .parse::<std::num::NonZeroU16>()
        .expect("PORT is not a number");
}
