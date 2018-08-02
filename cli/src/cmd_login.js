const inquirer = require("inquirer");
const config = require("./config");

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const poolData = {
  UserPoolId: "us-west-2_CoIS7kwaJ",
  ClientId: "469mi1m81mrn3s5m0cn0njp22l"
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = async function(username, password) {
  if (!username || !password) {
    const answers = await inquirer.prompt([
      {
        type: "username",
        name: "username",
        message: "username"
      },
      {
        type: "password",
        name: "password",
        message: "password"
      }
    ]);
    username = answers["username"];
    password = answers["password"];
  }

  try {
    const token = await loginUser(username, password);
    config.saveLoginToken(token);
    console.log("login success");
    return 0;
  } catch (error) {
    console.error(error);
    return 1;
  }
};

function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: username,
        Password: password
      }
    );
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        const token = result.getAccessToken().getJwtToken();
        if (!token) {
          reject("token not found in login response");
        } else {
          resolve(token);
        }
      },

      onFailure: function(err) {
        reject(err.message);
      }
    });
  });
}
