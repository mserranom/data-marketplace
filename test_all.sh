#!/usr/bin/env bash

# https://spin.atomicobject.com/2017/08/24/start-stop-bash-background-process/
trap "kill 0" EXIT

set -e

ROOT=$(pwd)

step () {
    GREEN='\033[0;32m'
    NO_COLOR='\033[0m'
    echo "${GREEN}--------> $1${NO_COLOR}"
}

step "deploy terraform stack"
cd ${ROOT}
terraform apply -auto-approve


step "build and run chalice server"
cd ${ROOT}/backend
pipenv run chalice local &
sleep 1


step "build and test CLI"
cd ${ROOT}/cli
npm install
npm test

step "build and test website"
cd ${ROOT}/website
npm install
npm start &
sleep 5
npm test


step "Done."