#!/bin/bash -eu

readonly host="$1"

until redis-cli -h "$host" ping 2> /dev/null; do
  >&2 echo 'Redis is unavailable - waiting'
  sleep 2
done

>&2 echo 'Redis is up!'
