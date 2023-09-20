#!/usr/bin/env bash

background=false
while getopts db flag
do
    case "${flag}" in
        b) background=true;;
    esac
done

if $background; then
    docker compose up -d dbit || exit 1
    
    pnpm --filter db start | sed -e 's/^/[helper] /' &
      pnpm --filter frontend it:dev | sed -e 's/^/[frontend] /' &
      RUST_ENV=it cargo watch -x run | sed -e 's/^/[backend] /' &
      wait

    # with another terminal run:
    # pn e2e pw ...

    exit 1;
fi

set -eo pipefail
trap "kill 0" EXIT

cargo build
turbo --filter frontend it:build
docker compose up -d dbit

RUST_ENV=it cargo run &
pnpm --filter db start &
pnpm --filter frontend it:start &

pnpm --filter rust_backend --filter db --filter frontend it:dep && 
  pnpm --filter e2e pw test

status=$?

exit $status
