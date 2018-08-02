const config = require("./config");
const backend = require("./backend");

module.exports = async function() {
  if (config.isLoggedIn()) {
    const data = await backend.request("/users/me");
    console.log(`username: ${data.Username}`);
    console.log(
      `email: ${data.UserAttributes.find(x => x.Name === "email").Value}`
    );
    return 0;
  } else {
    console.error("user is not logged in");
    return 1;
  }
};
