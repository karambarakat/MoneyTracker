#!/usr/bin/env bash

background=false
while getopts db flag
do
    case "${flag}" in
        b) background=true;;
        # a) age=${OPTARG};;
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

cargo build || exit 1;
turbo --filter frontend it:build || exit 1;

docker compose up -d dbit || exit 1

RUST_ENV=it cargo run || exit 1 &
job1=$!
pnpm --filter db start || exit 1 &
job2=$!
pnpm --filter frontend it:start || exit 1 &
job3=$!

pnpm --filter rust_backend --filter db --filter frontend it:dep && 
  pnpm --filter e2e pw test

status=$?

kill $job1
kill $job2
kill $job3

exit $status
