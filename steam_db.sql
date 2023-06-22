\echo 'Delete and recreate steam db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE steam_db;
CREATE DATABASE steam_db;

\c steam_db

\i steam_db-schema.sql
\i steam_db-seed.sql

\echo 'Delete and recreate steam_db_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE steam_db_test;
CREATE DATABASE steam_db_test;
\connect steam_db_test

\i steam_db-schema.sql
