#!/usr/bin/env bash

# https://spin.atomicobject.com/2017/08/24/start-stop-bash-background-process/
trap "kill 0" EXIT

set -e

ROOT=$(pwd)


echo "checking requirements"
terraform --help > /dev/null
pipenv --version > /dev/null
npm -v > /dev/null


echo "deploy terraform stack"
cd ${ROOT}
terraform apply -auto-approve


echo "build and run chalice server"
cd ${ROOT}/backend
pipenv install --ignore-pipfile
pipenv run chalice local --stage dev &
sleep 1


echo "build and run website"
cd ${ROOT}/website
npm install
npm start