#!/usr/bin/env bash

dev=false
while getopts d flag
do
    case "${flag}" in
        d) dev=true;;
        # a) age=${OPTARG};;
    esac
done

cargo build || exit 1

docker compose up -d dbit
# trap "docker compose down" EXIT ERR

RUST_ENV=it cargo run &
job1=$!
pnpm --filter db start &
job2=$!

pnpm --filter db --filter rust_backend it:dep && pnpm --filter db clean_db && pnpm --filter be_it jest
status=$?


kill $job1
kill $job2

exit $status



# RUST_ENV=it cargo run | sed -e 's/^/[be] /' &

#bg = $!



#result=$?

#kill $bg

#exit $result
