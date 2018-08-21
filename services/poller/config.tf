variable "environment" {
  type = "string"
}

variable "polling_subscriptions_table_arn" {
  type = "string"
}

variable "live_feeds_table_arn" {
  type = "string"
}

data "archive_file" "lambdas_zip" { 
  type = "zip"
  source_dir = "services/poller/lambdas" # relative directory must be from the root
  output_path = ".tmp/poller_lambdas.zip"
}

resource "aws_cloudwatch_event_rule" "every_two_minutes" {
  name = "every-two-minutes"
  description = "Fires every two minutes"
  schedule_expression = "rate(2 minutes)"
}

resource "aws_cloudwatch_event_target" "check_fetch_all_every_two_minutes" {
  rule = "${aws_cloudwatch_event_rule.every_two_minutes.name}"
  target_id = "fetch_all"
  arn = "${aws_lambda_function.fetch_all.arn}"
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_fetch_all" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.fetch_all.function_name}"
  principal = "events.amazonaws.com"
  source_arn = "${aws_cloudwatch_event_rule.every_two_minutes.arn}"
}

resource "aws_lambda_function" "fetch_all" {
  function_name = "poller_fetch_all-${var.environment}"
  filename = "${data.archive_file.lambdas_zip.output_path}"
  source_code_hash = "${base64sha256(file(data.archive_file.lambdas_zip.output_path))}"
  handler = "fetch_all.handler"
  runtime = "nodejs8.10"
  role = "${aws_iam_role.lambdas_role.arn}"
}

resource "aws_iam_role" "lambdas_role" {
  assume_role_policy = "${data.aws_iam_policy_document.lambdas_assume_role_policy.json}"
}

data "aws_iam_policy_document" "lambdas_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "lambda_to_dynamo_policy" {
  role = "${aws_iam_role.lambdas_role.name}"
  policy = "${data.aws_iam_policy_document.lambda_to_dynamodb_permissions.json}"
}

data "aws_iam_policy_document" "lambda_to_dynamodb_permissions" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:BatchGetItem",
			"dynamodb:GetItem",
			"dynamodb:Query",
			"dynamodb:Scan",
			"dynamodb:BatchWriteItem",
			"dynamodb:PutItem",
			"dynamodb:UpdateItem"
    ]
    resources = [
      "${var.polling_subscriptions_table_arn}",
      "${var.live_feeds_table_arn}"]
  }
}

resource "aws_iam_role_policy" "lambda_to_cloudwatch_policy" {
  role = "${aws_iam_role.lambdas_role.name}"
  policy = "${data.aws_iam_policy_document.lambda_to_cloudwatch_permissions.json}"
}

data "aws_iam_policy_document" "lambda_to_cloudwatch_permissions" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "arn:aws:logs:::*",
    ]
  }
}