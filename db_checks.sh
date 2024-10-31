#!/bin/sh

# Wait until the database is up and accepting connections
echo "Waiting for the database to be available..."

while ! nc -z mongo 27017; do
  sleep 1
done

echo "Database is up and running!"
exec "$@"
