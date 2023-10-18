FROM rust:latest

WORKDIR /usr/src/backend
COPY . .

RUN cargo install --path .

CMD ["backend"]
