const Configstore = require("configstore");
const conf = new Configstore("mktplc");

module.exports.isLoggedIn = function() {
  return conf.has("token");
};

module.exports.getLoginToken = function() {
  return conf.get("token");
};

module.exports.saveLoginToken = function(token) {
  conf.set("token", token);
};

module.exports.deleteToken = function() {
  conf.delete("token");
};
