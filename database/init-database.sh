#!/bin/bash

# Immediately exits if any error occurs during the script
# execution. If not set, an error could occur and the
# script would continue its execution.
set -o errexit

readonly REQUIRED_ENV_VARS=(
  "POSTGRES_PASSWORD"
  "POSTGRES_DB"
  "POSTGRES_USER")

main() {
  check_env_vars_set
  init_user_and_db
}

check_env_vars_set() {
  for required_env_var in ${REQUIRED_ENV_VARS[@]}; do
    if [[ -z "${!required_env_var}" ]]; then
      echo "Error:
    Environment variable '$required_env_var' not set.
    Make sure you have the following environment variables set:
      ${REQUIRED_ENV_VARS[@]}
Aborting."
      exit 1
    fi
  done
}

init_user_and_db() {
  psql -v ON_ERROR_STOP=1 --username "root" <<-EOSQL
     CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
     CREATE DATABASE $POSTGRES_DB;
     GRANT ALL PRIVILEGES ON DATABASE $FILLA_DB_DATABASE TO $POSTGRES_USER;
EOSQL
}

main "$@"