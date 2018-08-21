const backend = require("./backend");
const fs = require("fs-extra");

const { isLoggedIn } = require("./config");

module.exports.add = async function(config_key) {
  if (!isLoggedIn()) {
    console.error("user is not logged in");
    return 1;
  }
  await backend.request("/subscriptions", "POST", { config_key });
  console.log(`ok`);
  return 0;
};

module.exports.getAll = async function() {
  if (!isLoggedIn()) {
    console.error("user is not logged in");
    return 1;
  }
  const response = await backend.request(
    "/subscriptions?full_content=true",
    "GET"
  );
  const config_keys = response.map(x => x.config.name);
  console.log(JSON.stringify(config_keys, null, 2));
  return 0;
};

module.exports.delete = async function(config_key) {
  if (!isLoggedIn()) {
    console.error("user is not logged in");
    return 1;
  }
  await backend.request("/subscriptions", "DELETE", { config_key });
  console.log(`ok`);
  return 0;
};
