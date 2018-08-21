const config = require("./config");

const SERVER = "http://127.0.0.1:8000";

const isString = x => typeof x === "string" || x instanceof String;

module.exports.request = async function(endpoint, method = "GET", body) {
  return new Promise(async resolve => {
    const token = config.getLoginToken();
    const params = {
      method: method,
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    };

    if (body) {
      params.body = isString(body) ? body : JSON.stringify(body);
    }

    let response;
    try {
      response = await fetch(`${SERVER}${endpoint}`, params);
    } catch (err) {
      console.error(`fetch error requesting ${endpoint}, ${method} `);
      console.error(`* ` + err);
      process.exit(1);
    }

    if (response.ok) {
      try {
        const data = await response.json();
        resolve(data);
      } catch (err) {
        console.error(
          `error parsing JSON response from ${endpoint}, ${method} `
        );
        console.error(`* http_status=${response.status}`);
        console.error(`* ` + err);
        process.exit(1);
      }
    } else {
      console.error(`backend error`);
      console.error(`* http_status=${response.status}`);
      const textResponse = await response.text();
      console.error(`* message=${textResponse}`);
      process.exit(1);
    }
  });
};
