const shell = require("shelljs");

module.exports.run = function(args) {
  return shell.exec(`node index.js ${args}`, { silent: true });
};
