FROM node:21-bookworm as js

RUN npm install -g pnpm

WORKDIR /repo

COPY .devcontainer/meta/js .

RUN pnpm config set store-dir /pnpm/store/.pnpm-store

RUN pnpm install --frozen-lockfile

RUN pnpm store path > /etc/pnpm-store-path

FROM rust:1-bookworm as rs

WORKDIR /repo

COPY .devcontainer/meta/rs .

RUN cargo build 

# FROM debian:bookworm

# WORKDIR /repo

# COPY --from=js /repo /repo
# COPY --from=js /etc/pnpm-store-path /etc/pnpm-store-path
# COPY --from=js /pnpm/store/.pnpm-store /pnpm/store/.pnpm-store
# COPY --from=rs /repo /repo

CMD [ "sleep", "infinitly" ]