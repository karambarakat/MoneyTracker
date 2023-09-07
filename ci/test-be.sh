#!/usr/bin/env bash

cargo build || exit 1
wait-on -t 1000 tcp:5430 || pnpm run db || exit 1

RUST_ENV=it cargo run | sed -e 's/^/[be] /' &

bg = $!

pnpm --filter rust it:dep && pnpm --filter be_it jest

result=$?

kill $bg

exit $result