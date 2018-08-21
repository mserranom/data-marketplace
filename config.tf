provider "aws" {
  version = "~> 1.31"
  region = "us-west-2"
}

variable "environment" {
  type = "string"
  default = "dev"
}

module "persistence" {
  source = "./persistence"
  environment = "${var.environment}"
}

module "poller" {
  source = "./services/poller"
  environment = "${var.environment}"
  polling_subscriptions_table_arn = "${module.persistence.polling_subscriptions_table_arn}"
  live_feeds_table_arn = "${module.persistence.live_feeds_table_arn}"
}