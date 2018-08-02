#!/usr/bin/env bash

set -e

# extract local dynamo if needed
if [ ! -d "etc/dynamodb_local_latest" ]; then
  unzip etc/dynamodb_local_latest.zip -d etc/dynamodb_local_latest
fi

# start local dynamodb
java -Djava.library.path=$(pwd)/etc/dynamodb_local -jar $(pwd)/etc/dynamodb_local/DynamoDBLocal.jar -sharedDb -inMemory -port 8001 &

# create tables
aws dynamodb create-table --cli-input-json file://etc/table_configs.json --endpoint-url http://localhost:8001
aws dynamodb create-table --cli-input-json file://etc/table_live_feeds.json --endpoint-url http://localhost:8001
aws dynamodb create-table --cli-input-json file://etc/table_polling_subscriptions.json --endpoint-url http://localhost:8001

# run chalice in local mode
pipenv run chalice local