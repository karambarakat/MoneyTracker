turbo test build typecheck && 
./ci/test-sb.sh && 
./ci/rust.sh && 
./ci/test-be.sh && 
./ci/test-e2e.sh &&
echo ci should be good to go
