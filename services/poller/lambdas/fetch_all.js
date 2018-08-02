"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const fetch = require("node-fetch");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_SUBSCRIPTIONS = "polling_subscriptions";
const TABLE_FEEDS = "live_feeds";

const ALL_SUBSCRIPTIONS_QUERY = {
  TableName: TABLE_SUBSCRIPTIONS,
  KeyConditionExpression: "#interval = :intervalValue",
  ExpressionAttributeNames: {
    "#interval": "interval"
  },
  ExpressionAttributeValues: {
    ":intervalValue": 60
  }
};

exports.handler = async function(event, context, callback) {
  try {
    await execute();
    callback("ok");
  } catch (err) {
    callback(null, err);
  }
};

exports.test = function() {
  execute();
};

async function execute() {
  try {
    const allConfigs = await getAllConfigs();
    console.log("retrieved " + allConfigs.length + " configs");
    await Promise.all(allConfigs.map(config => fetchAndSaveFeed(config)));
    console.log("feeds updated successfully");
  } catch (err) {
    console.error(err);
  }
}

function getAllConfigs() {
  return new Promise((resolve, reject) => {
    dynamodb.query(ALL_SUBSCRIPTIONS_QUERY, function(err, data) {
      if (err) {
        reject(
          "Unable to query: " + err.message || JSON.stringify(err, null, 2)
        );
      } else {
        resolve(data.Items);
      }
    });
  });
}

async function fetchAndSaveFeed(config) {
  const response = await fetch(config.url);
  if (!response.ok) {
    throw new Error("Unable to retrieve " + config.url);
  }

  const nowTimestamp = new Date().toISOString()
  const feedContent = await response.text();

  const putParams = {
    TableName: TABLE_FEEDS,
    Item: {
      url: config.url,
      content: feedContent,
      last_updated: nowTimestamp
    }
  };

  return new Promise((resolve, reject) => {
    dynamodb.put(putParams, function(err) {
      if (err) {
        reject(
          "Unable to insert feed: " + err.message ||
            JSON.stringify(err, null, 2)
        );
      } else {
        resolve();
      }
    });
  });
}
