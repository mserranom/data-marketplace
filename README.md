# Data Marketplace

## Running locally

0. Make sure Cognito is setup with the appropiate test users. Unfortunately we can't automate this yet due to impossibility of creating users programmatically for testing.
1. Deploy AWS resources using Terraform: `terraform apply -auto-approve`
2. Run Chalice server: `cd backend && pipenv run chalice local` (make sure `pipenv install --dev` has been run first)
3. Run webserver: `cd website && npm start`

## Deployment

Not there yet

## Test instructions

1. Execute 'Run Locally' steps, but no need to deploy the webserver
2. Run cli tests for e2e coverage: `cd cli && npm test`
3. Run website tests: