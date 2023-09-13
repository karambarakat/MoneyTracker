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

concurrently -n "sb,test" -c "bgBlue,green" --k -s first \
    "pnpm --filter ui serve -p 9005" \
    "wait-on tcp:9005 && pnpm --filter ui tsb --url http://127.0.0.1:9005"

exit $?;
