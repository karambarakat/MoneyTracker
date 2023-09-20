#!/usr/bin/env bash

dev=false
while getopts d flag
do
    case "${flag}" in
        d) dev=true;;
    esac
done

set -eo pipefail
trap "kill 0" EXIT

cargo build
docker compose up -d dbit

RUST_ENV=it cargo run &
pnpm --filter db start &

wait-on tcp:4200 -t 60000 && pnpm --filter db clean_db && pnpm --filter be_it jest
status=$?

exit $status
