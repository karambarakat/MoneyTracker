static RUST_ENV: &str = env!("RUST_ENV");

pub fn load_env() {
    dotenv::from_filename(format!("apps/rust/.env.{}.local", RUST_ENV)).ok();
    dotenv::from_filename(format!("apps/rust/.env.{}", RUST_ENV)).ok();
    dotenv::from_filename("apps/rust/.env").ok();

    std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");

    std::env::var("JWT_SALT").expect("JWT_SALT is not set");

    std::env::var("SALT").expect("SALT is not set");

    std::env::var("PORT")
        .expect("PORT is not set")
        .parse::<u16>()
        .expect("PORT is not a number");
}
