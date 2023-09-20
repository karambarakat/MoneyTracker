#!/usr/bin/env bash

background=false
while getopts b flag
do
    case "${flag}" in
        b) background=true;;
    esac
done

if $background; then
    pnpm --filter ui it:dev & wait

    # with another terminal run:
    # pn ui it:test ...

    exit 1;
fi

set -eo pipefail
trap "kill 0" EXIT

turbo --filter ui build;

pnpm --filter ui serve -p 9005 &
job1=$!

wait-on -t 60000 http://127.0.0.1:9005 && turbo --filter ui it:test
result=$?

exit $result;
