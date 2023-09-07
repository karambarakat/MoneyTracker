#!/usr/bin/env bash

pnpm --filter ui build;

concurrently -n "sb,test" -c "bgBlue,green" --k -s first \
    "pnpm --filter ui serve -p 9005" \
    "wait-on tcp:9005 && pnpm --filter ui tsb --url http://127.0.0.1:9005"

# pnpm --filter ui build

# (pnpm --filter ui serve -p 9005 | sed -e 's/^/[bg] /')&
# bg=$!

# wait-on tcp:9005

# pnpm --filter ui tsb --url http://127.0.0.1:9005
result=$?

# kill $bg

# wait 

exit $result