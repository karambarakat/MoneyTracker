#!/bin/bash

set -e

echo customizing bash experience

cat .bashrc >> ~/.bashrc

cargo install cargo-watch
