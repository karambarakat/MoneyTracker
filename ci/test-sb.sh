#!/usr/bin/env bash

background=false
while getopts b flag
do
    case "${flag}" in
        d) background=true;;
        # a) age=${OPTARG};;
    esac
done

if $background; then
    pnpm --filter ui it:dev &

    # with another terminal run:
    # pn ui it:test ...

    exit 1;
fi

turbo --filter ui build || exit 1;

pnpm --filter ui serve -p 9005 &
job1=$!

wait-on -t 60000 http://127.0.0.1:9005 && turbo --filter ui it:test
result=$?

kill $job1

exit $result;
