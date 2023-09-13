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

concurrently -n "bg,test" -c "bgBlue,green" --k -s first \
	"RUST_ENV=it cargo run & pnpm --filter db start" \
	"pnpm --filter db --filter rust_backend it:dep && pnpm --filter be_it jest"

# RUST_ENV=it cargo run | sed -e 's/^/[be] /' &

#bg = $!



#result=$?

#kill $bg

#exit $result
