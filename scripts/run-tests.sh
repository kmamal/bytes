#!/usr/bin/env bash

set -e

shopt -s globstar nullglob
node node_modules/@kmamal/testing src/**/*.test.js
