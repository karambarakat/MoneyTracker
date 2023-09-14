#!/usr/bin/env bash

dev=false
while getopts d flag
do
    case "${flag}" in
        d) dev=true;;
        # a) age=${OPTARG};;
    esac
done

if $dev; then
    pnpm --filter ui sb;
    exit $?;
fi

turbo --filter ui build || exit 1;

pnpm --filter ui serve -p 9005 &
job1=$!

wait-on tcp:9005 && pnpm --filter ui tsb --url http://localhost:9005
result=$?

kill $job1

exit $result;
