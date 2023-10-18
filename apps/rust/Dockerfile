FROM rust:latest as base

WORKDIR /usr/src/backend

RUN rustup target add x86_64-unknown-linux-musl
RUN apt update && apt install -y musl-tools musl-dev
RUN update-ca-certificates

COPY . .

RUN find . -type f -name "Cargo.toml" -print0 | xargs --null -I {} echo {} > cargo.log
RUN sed -i 's/^.\///' cargo.log
RUN cat cargo.log | sed 's/Cargo.toml//' | xargs -I {} mkdir -p ./cargo/{}
RUN cat cargo.log | sed 's/Cargo.toml//' | xargs -I {} mkdir -p ./cargo/{}/src
RUN cat cargo.log | sed 's/Cargo.toml//' | xargs -I {} touch ./cargo/{}/src/lib.rs
RUN cat cargo.log | sed 's/Cargo.toml//' | xargs -I {{}} sh -c "echo 'fn main(){}' > ./cargo/{{}}/src/main.rs"
RUN cat cargo.log | xargs -I {} cp {} ./cargo/{}
COPY Cargo.toml ./cargo/Cargo.toml
COPY Cargo.lock ./cargo/Cargo.lock

FROM rust:latest as install

WORKDIR /usr/src/backend
COPY --from=base ./usr/src/backend/cargo .

RUN ls -Rl . > cargo.log

RUN cargo build
RUN cargo build --release

RUN find . -type f -name "main.rs" -print0 > rs.log
RUN find . -type f -name "lib.rs" -print0 >> rs.log
RUN echo >> rs.log
RUN cat rs.log | xargs rm

COPY . .

RUN cargo build --bin backend --release --target x86_64-unknown-linux-musl

FROM alpine

WORKDIR /usr/dist
COPY --from=install usr/src/backend/target/x86_64-unknown-linux-musl/release .

EXPOSE 8080

RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --uid "10001" \
  "be"

USER be:be

CMD ["usr/dist/backend"]