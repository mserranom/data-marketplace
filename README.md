# Data Marketplace

## Running locally

0. Make sure Cognito is setup with the appropiate test users. Unfortunately we can't automate this yet due to impossibility of creating users programmatically for testing.
1. Deploy AWS resources using Terraform: `terraform apply -auto-approve`
1. Run Chalice server: `cd backend && pipenv run chalice local` (make sure `pipenv install --dev` has been run first)
1. Run webserver: `cd website && npm start`

## Deployment

Not there yet

## Test instructions

Execute all test with `sh test_all.sh`, may or may not work!

To test react components run `storybook` with `cd website && npm run storybook`.
