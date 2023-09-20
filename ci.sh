# used localy to mimic what github ci action will do

./ci/pre-commit.sh || exit 1;

turbo test build typecheck && 
./ci/rust.sh && 
./ci/test-sb.sh && 
./ci/test-be.sh && 
./ci/test-e2e.sh &&
echo ci should be good to go
