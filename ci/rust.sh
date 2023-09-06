set -eo pipefail

echo "checking rust"
cargo check | sed -e 's/^/[check] /';

echo "testing rust";
cargo test | sed -e 's/^/[test] /';

echo "building graphql schema";
cargo run --bin schema | sed -e 's/^/[schema] /';

echo "building typescript related to graphql schema";
pnpm --filter types build | sed -e 's/^/[types] /';
