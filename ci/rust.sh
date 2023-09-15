set -eo pipefail

cargo check | sed -e 's/^/[check] /';
cargo test | sed -e 's/^/[test] /';
cargo run --bin schema | sed -e 's/^/[schema] /';
cargo run --bin export_bindings | sed -e 's/^/[export_bindings] /';
turbo --filter types build | sed -e 's/^/[types] /';
