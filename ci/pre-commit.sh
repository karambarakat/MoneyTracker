set -eo pipefail

pnpm exec prettier --write . | sed -e 's/^/[prettier] /' || exit 1;
# turbo run lint | sed -e 's/^/[lint] /' || exit 1;