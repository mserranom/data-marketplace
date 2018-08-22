// AWS Node SDK: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminCreateUser-property

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const COGNITO_USER_POOL_ID = "us-west-2_CoIS7kwaJ";

export const TEST_USER_NAME = "test_user";
export const TEST_USER_PASS = "asAf_124!";

export function deleteUser(userId) {
	var params = {
		UserPoolId: COGNITO_USER_POOL_ID,
		Username: userId
	};
	return new Promise((resolve, reject) => {
		const service = new AWS.CognitoIdentityServiceProvider();
		service.adminDeleteUser(params, function(err, data) {
			if (err) {
				reject(err.message || err);
			} else {
				resolve();
			}
		});
	});
}

export function getUser(userId) {
	var params = {
		UserPoolId: COGNITO_USER_POOL_ID,
		Username: userId
	};
	return new Promise((resolve, reject) => {
		const service = new AWS.CognitoIdentityServiceProvider();
		service.adminGetUser(params, function(err, data) {
			if (err) {
				reject(err.message || err);
			} else {
				resolve(data);
			}
		});
	});
}

// Not working properly, will create an user requiring a password change,
// that's not usable
export function createUser(userId, password) {
	var params = {
		UserPoolId: COGNITO_USER_POOL_ID,
		Username: userId,
		TemporaryPassword: password
	};
	return new Promise((resolve, reject) => {
		const service = new AWS.CognitoIdentityServiceProvider();
		service.adminCreateUser(params, function(err, data) {
			if (err) {
				reject(err.message || err);
			} else {
				service.adminConfirmSignUp(
					{
						UserPoolId: COGNITO_USER_POOL_ID,
						Username: userId
					},
					function(err) {
						if (err) {
							reject(err.message || err);
						} else {
							resolve();
						}
					}
				);
			}
		});
	});
}
