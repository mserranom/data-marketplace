https://docs.google.com/document/d/1TWg-mmN04c1GXZGWMcTzn_XgSDhZ6Jh-n1nV1vwzit4/edit


# config.yml

```yaml
Name: NYSE Market Data Feeds
Description: |
    Market data feeds cover the various asset classes and markets in the
    NYSE Group to offer you insight into intraday trading activity.
LongDescription: |
    ## Some Markup Data here
    * A list item
    * Another list item
Subscriptions:
  - Type: monthly
    Price: 6.99
    Currency: USD
  - Type: trial-7-day
    Period: week
    Duration: 2
  - Type: academic
    Period: perpetual
Feeds:
  - Name: NYSE Integrated Feed
    Description: intraday trading activity.
    LongDescription: Some Markup Data here
    Labels: nyse, stock
    Topics:
      - Format: JSON
        Type: poll
        Url: https://my.websocket.file
        Security: safely_stored_config_id
        PollPeriod: seconds
        PollDuration: 60
      - Format: MyRandomBinaryFormat
        Type: poll
        Url: https://my.websocket.file/random_format
        Security: safely_stored_config_id
        PollPeriod: seconds
        PollDuration: 60
    Subscriptions:
      - Type: monthly
        Price: 2.99
        Currency: USD
        HistoryAcccess: false
      - Type: monthly
        Price: 5.99
        Currency: USD
        HistoryAcccess: true
    Retention:
      Period: day
      Duration: 30
  - Name: NYSE Integrated Daily Feed
    Description: daily aggregated trading activity.
    LongDescription: Some Markup Data here
    Topics:
      - Format: CSV
        Type: websocket
        Url: ws://my.websocket.file
        Security: safely_stored_config_id
        Transform:
            Type: sql
            Query: SELECT *
    Subscriptions:
      - Type: monthly
        Price: 0.99
        Currency: USD
        HistoryAcccess: true
    Retention:
      Period: perpetual
```

# Topic sources

All have a `Security: safely_stored_config_id` field when needed.

```yaml
Type: websocket
Url: ws://my.websocket.file
```

```yaml
Type: kafka
Url: mydomain.com/topic
```

```yaml
Type: poll
Url: http://datosabiertos.malaga.eu/recursos/transporte/EMT/EMTlineasUbicaciones/lineasyubicaciones.geojson
PollPeriod: seconds
PollDuration: 60
```




