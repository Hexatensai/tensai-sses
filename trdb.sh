#!/bin/bash
set -e
exec sudo -u postgres postgres -D /usr/local/var/postgres
psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" <<-EOSQL
    CREATE USER tensai WITH PASSWORD 'tensai@33';
    ALTER USER tensai WITH LOGIN CREATEDB CREATEROLE;
    CREATE DATABASE tensaireleasenew OWNER tensai ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE tensaireleasenew to tensai ;
EOSQL

