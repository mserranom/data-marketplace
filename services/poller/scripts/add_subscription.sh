#!/usr/bin/env bash

aws lambda invoke \
--function-name poller_add_subscription \
--log-type Tail \
--payload '{"subscription":{"period":60, "url":"https://raw.githubusercontent.com/productml/blurr/master/Pipfile.lock"}}' \
out.txt 
cat out.txt
