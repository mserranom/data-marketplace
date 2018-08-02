resource "aws_dynamodb_table" "app_config" {
  name = "app_config"
  hash_key = "app_name"
  read_capacity = 5
  write_capacity = 5
  attribute {
    name = "app_name"
    type = "S"
  }
}

resource "aws_dynamodb_table" "configs" {
  name = "configs"
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

resource "aws_dynamodb_table" "config_tags" {
  name = "config_tags"
  hash_key = "tag"
  range_key = "config_id" #TODO NOT ENOUGH! it's not unique!!
  read_capacity = 5
  write_capacity = 5
  attribute {
    name = "tag"
    type = "S"
  }
  attribute {
    name = "config_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "polling_subscriptions" {
  name = "polling_subscriptions"
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
  name = "live_feeds"
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

output "polling_subscriptions_table_arn" {
  value = "${aws_dynamodb_table.polling_subscriptions.arn}"
}

output "live_feeds_table_arn" {
  value = "${aws_dynamodb_table.live_feeds.arn}"
}
