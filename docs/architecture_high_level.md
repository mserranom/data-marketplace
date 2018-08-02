# Data Source Types

## Poll

- Any new data is pushed to a Kinesis Stream
- From the queue, is read by lambda and published to sns topic
- The websocket server is subscribed to sns topic

- Assuming we have a single socket.io instance
- A user subscribes to a topic by connecting to a web socket
- If the socket server is not subscribed to the sns topic, it subscribes to it
- there's a cache with all topics subscribed, and number of open connections
- every X seconds, sns topic subscriptions are cleanedup
- any time there's a SNS event for a topic, the socket server broadcast to all connected instances

> Question: what's the best way, from the lambda, to notify the socket server to broadcast the message?

- The socket server will manage authentication or the gateway will?

# Workflow

- New messages are pushed to Kinesis
- Any new message is immediately processed by Lambda functions.

  - If History is enabled for the topic, it's sent to Kinesis Firehose so it gets saved to S3
  - Another lambda pushes the message to the appropiate SNS topic

- Separately, there's a lambda executed for any topic to broadcast the message to all the appropiate socket.io nodes

# Ideal Serverless

- Any time a new feed is added, a new SNS topic is created
- SNS topics invoke a lambda that send the event to firehose if history is needed
- SNS topics invoke a lambda that sends the event to the MQTT topic for broadcast
-

* MQTT with gsatewau?


# Tech

## Charts

* [Library comparison}(https://medium.com/@raph.turtle/great-comparison-7021dc35335c)
* https://gionkunz.github.io/chartist-js/
* https://formidable.com/open-source/victory/docs/victory-theme/
* https://www.chartjs.org/

# Icons

* https://fontawesome.com/icons?d=gallery

# Notes
https://twitter.com/Suhail/status/1009454387171692544
https://twitter.com/Suhail/status/1004042099694530560

# Security

* [Secret in the URL](https://security.stackexchange.com/questions/118975/a-secret-in-a-url)
* https://www.fullcontact.com/blog/never-put-secrets-urls-query-parameters/

# Dynamodb

* https://www.slideshare.net/AmazonWebServices/amazon-dynamodb-design-patterns-for-ultrahigh-performance-apps-dat304-aws-reinvent-2013-28436991
* https://blog.codeship.com/querying-and-pagination-with-dynamodb/

# React + Redux

* https://github.com/supasate/connected-react-router

# Patterns

* https://stackoverflow.com/questions/2300356/using-a-single-row-configuration-table-in-sql-server-database-bad-idea

# AWS

* https://medium.com/@EmiiKhaos/automated-aws-account-initialization-with-terraform-and-onelogin-saml-sso-1301ff4851ab