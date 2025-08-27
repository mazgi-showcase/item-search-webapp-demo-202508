#!/usr/bin/bash -eu

readonly SCRIPT_DIR=$(dirname ${BASH_SOURCE[0]})

# app
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS app_rc CHARACTER SET utf8 COLLATE utf8_general_ci;'
for sql in $(\ls -1 ${SCRIPT_DIR}/app/sqls/*.sql)
do
  mysql -u root app_rc < ${sql}
done
