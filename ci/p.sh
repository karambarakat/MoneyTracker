cleanup() {
  echo 'Error raised. Exiting!'
}

trap 'cleanup' ERR

set -eo pipefail
