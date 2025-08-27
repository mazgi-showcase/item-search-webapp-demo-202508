#!/bin/bash -eu

readonly url="$1"

until curl -LI "$url" 2> /dev/null; do
  >&2 echo "${url} is unavailable - waiting"
  sleep 2
done

>&2 echo "${url} is up!"
