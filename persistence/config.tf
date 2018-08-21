variable "environment" {
  type = "string"
}

resource "aws_dynamodb_table" "configs" {
  name = "configs-${var.environment}"
  hash_key = "user_id"
  range_key = "id"
  read_capacity = 5
  write_capacity = 5
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "user_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "subscriptions" {
  name = "subscriptions-${var.environment}"
  hash_key = "user_id"
  range_key = "config_key"
  read_capacity = 5
  write_capacity = 5
  attribute {
    name = "user_id"
    type = "S"
  }
  attribute {
    name = "config_key"
    type = "S"
  }
}

resource "aws_dynamodb_table" "config_tags" {
  name = "config_tags-${var.environment}"
  hash_key = "tag"
  range_key = "config_key"
  read_capacity = 5
  write_capacity = 5
  attribute {
    name = "tag"
    type = "S"
  }
  attribute {
    name = "config_key"
    type = "S"
  }
}

resource "aws_dynamodb_table" "polling_subscriptions" {
  name = "polling_subscriptions-${var.environment}"
  hash_key = "interval"
  range_key = "url"
  read_capacity = 5
  write_capacity = 5
  attribute {
    name = "interval"
    type = "N"
  }
  attribute {
    name = "url"
    type = "S"
  }
}

resource "aws_dynamodb_table" "live_feeds" {
  name = "live_feeds-${var.environment}"
  hash_key = "url"
  range_key = "last_updated"
  read_capacity = 5
  write_capacity = 5
  attribute {
    name = "url"
    type = "S"
  }
  attribute {
    name = "last_updated"
    type = "S"
  }
}

output "configs_table_arn" {
  value = "${aws_dynamodb_table.configs.arn}"
}

output "subscriptions_table_arn" {
  value = "${aws_dynamodb_table.subscriptions.arn}"
}

output "polling_subscriptions_config_tags_arn" {
  value = "${aws_dynamodb_table.config_tags.arn}"
}

output "polling_subscriptions_table_arn" {
  value = "${aws_dynamodb_table.polling_subscriptions.arn}"
}

output "live_feeds_table_arn" {
  value = "${aws_dynamodb_table.live_feeds.arn}"
}
