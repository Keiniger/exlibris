PGPASSWORD=exlibris psql -h localhost -U exlibris -d postgres -c 'DROP DATABASE exlibris_dev;'
PGPASSWORD=exlibris psql -h localhost -U exlibris -d postgres -c 'CREATE DATABASE exlibris_dev;'
PGPASSWORD=exlibris pg_restore -h localhost -p 5432 -U exlibris -d exlibris_dev -v -c --if-exists --no-acl --no-owner ./fiction.dump