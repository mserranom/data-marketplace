provider "aws" {
  version = "~> 1.23"
  region = "us-west-2"
}

module "persistence" {
  source = "./persistence"
}

module "poller" {
  source = "./services/poller"
  polling_subscriptions_table_arn = "${module.persistence.polling_subscriptions_table_arn}"
  live_feeds_table_arn = "${module.persistence.live_feeds_table_arn}"
}