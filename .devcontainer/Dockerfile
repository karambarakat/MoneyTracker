FROM node:21-bookworm as js

RUN npm install -g pnpm

WORKDIR /repo

COPY .devcontainer/meta/js .

RUN pnpm config set store-dir /pnpm/store/.pnpm-store

COPY patches patches 

RUN pnpm install --frozen-lockfile

FROM rust:1-bookworm as rs

WORKDIR /repo

COPY .devcontainer/meta/rs .

RUN cargo build 

FROM ubuntu:22.04

WORKDIR /repo

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY --from=js /root/.chache /root/.chache
COPY --from=js /repo /repo
COPY --from=js /pnpm /pnpm
COPY --from=rs /repo /repo

CMD [ "sleep", "infinitly" ]