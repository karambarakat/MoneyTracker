set -eo pipefail

echo hi;
# pnpm exec prettier --write . | sed -e 's/^/[prettier] /' || exit 1;
# turbo run lint | sed -e 's/^/[lint] /' || exit 1;