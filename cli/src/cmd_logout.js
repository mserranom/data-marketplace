const config = require("./config");

module.exports = async function() {
  config.deleteToken();
};
