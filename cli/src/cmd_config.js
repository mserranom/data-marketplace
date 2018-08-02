const backend = require("./backend");
const fs = require("fs-extra");
const yaml = require("js-yaml");

const { isLoggedIn } = require("./config");

module.exports.add = async function(data) {
  if (!isLoggedIn()) {
    console.error("user is not logged in");
    return 1;
  }

  let config;
  if (!fs.existsSync(data)) {
    config = data;
  } else {
    const fileContent = await fs.readFile(data, "utf8");
    const isYAML = await isYAMLString(fileContent);
    config = isYAML ? JSON.stringify({ yaml: fileContent }) : fileContent;
  }

  await backend.request("/config", "POST", config);
  console.log(`ok`);
  return 0;
};

module.exports.getAll = async function(tag) {
  if (!isLoggedIn()) {
    console.error("user is not logged in");
    return 1;
  }
  const endpoint = tag ? `/tags/${tag}` : "/config";
  const response = await backend.request(endpoint, "GET");
  console.log(JSON.stringify(response, null, 2));
  return 0;
};

module.exports.delete = async function(id) {
  if (!isLoggedIn()) {
    console.error("user is not logged in");
    return 1;
  }
  await backend.request(`/config/${id}`, "DELETE");
  console.log(`ok`);
  return 0;
};

async function isYAMLString(data) {
  try {
    yaml.safeLoad(data);
    return true;
  } catch (e) {
    return false;
  }
}
