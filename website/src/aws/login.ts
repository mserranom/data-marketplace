// most of the code comes from https://github.com/aws/aws-amplify/tree/master/packages/amazon-cognito-identity-js

// const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUserSession,
  ISignUpResult
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-west-2_CoIS7kwaJ",
  ClientId: "469mi1m81mrn3s5m0cn0njp22l"
};

interface ErrorMessage {
  message: string;
}

const userPool = new CognitoUserPool(poolData);

export function signupUser(username: string, password: string, email: string) {
  const dataEmail = {
    Name: "email",
    Value: email
  };
  const attributeList = [new CognitoUserAttribute(dataEmail)];
  return new Promise<CognitoUser>((resolve, reject) => {
    userPool.signUp(username, password, attributeList, [], function(
      err,
      result: ISignUpResult
    ) {
      if (err) {
        console.error("signup error:" + err.message || JSON.stringify(err));
        reject(err.message || JSON.stringify(err));
      } else {
        console.log("user name is " + result.user.getUsername());
        resolve(result.user);
      }
    });
  });
}

export function confirmUser(cognitoUser: CognitoUser, code: string) {
  return new Promise<void>((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        console.error(
          "signup confirmation error:" + err.message || JSON.stringify(err)
        );
        reject(err.message || JSON.stringify(err));
      } else {
        console.log("signup confirmation success: " + result);
        resolve();
      }
    });
  });
}

export function loginUser(username: string, password: string) {
  return new Promise<string>((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        resolve(result.getAccessToken().getJwtToken());
      },

      onFailure: function(err) {
        console.error(err.message || JSON.stringify(err));
        reject(err.message || JSON.stringify(err));
      }
    });
  });
}

export function signout() {
  const userPool = new CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
}

// TODO: cache!!
export function getToken() {
  return new Promise<string>((resolve, reject) => {
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      reject("local storage has no cognito user");
    } else {
      cognitoUser.getSession(function(
        err: ErrorMessage,
        session: CognitoUserSession
      ) {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else {
          console.log("session validity: " + session.isValid());
          resolve(session.getAccessToken().getJwtToken());
        }
      });
    }
  });
}

export function checkCurrentUsername() {
  return new Promise<string>((resolve, reject) => {
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      resolve(undefined);
    } else {
      cognitoUser.getSession(function(
        err: ErrorMessage,
        session: CognitoUserSession
      ) {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else {
          console.log("session validity: " + session.isValid());
          resolve(cognitoUser.getUsername());
        }
      });
    }
  });
}
/*

Object returned when login:

{
	"idToken": {
	  "jwtToken": "eyJraWQiOiJWVmtGS3JQdldyTzkrWHhZQldTZlg5c3ZkbHlzbnRRcmRzNWE4VHRrVDBBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiNGI4YWZjMC00OTRmLTQ4YTYtYmU0OC1hMjE4ZGMwNWJjOGUiLCJhdWQiOiI0NjltaTFtODFtcm4zczVtMGNuMG5qcDIybCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6ImEyY2UzMzg4LTczODQtMTFlOC1iYjE2LTE3ZDRmY2E4ZTg1YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTI5Mzg3NDE0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Db0lTN2t3YUoiLCJjb2duaXRvOnVzZXJuYW1lIjoibWlndWVsIiwiZXhwIjoxNTI5MzkxMDE0LCJpYXQiOjE1MjkzODc0MTQsImVtYWlsIjoiZ29taW5vbGFzQGdtYWlsLmNvbSJ9.Moxg68_SzRVeVvfQHBpaJ78Mijo-BV7lrP32w5TRHxwV328KVsXZzw3a9FbdUqhClgzydVJzQGpBZ3qZ-cO_yWM4qUcswDJdNej8oHMKfJn-8i46A_xQpL4AL9YOS6QCs_eLYMQl6qQEzmki5wzfvJUq0I4URcfmBrOze1YjKEzPY_YaCALzsXboPdo5-Y_Awb9D-DnF0E0yiEsfwt-6dubWxjyr3pPfVDJ4wUrIzWEiywFBlYfu7nqDrgv_U2g3z18uZHi8glVdGREUoxyH2u1Llc38JmPfGVYb5itaj5EtNZ23d_-AcnSD1yH6ANSxM7XcmBCX8FmK7DmEbDkQwg",
	  "payload": {
		"sub": "b4b8afc0-494f-48a6-be48-a218dc05bc8e",
		"aud": "469mi1m81mrn3s5m0cn0njp22l",
		"email_verified": true,
		"event_id": "a2ce3388-7384-11e8-bb16-17d4fca8e85a",
		"token_use": "id",
		"auth_time": 1529387414,
		"iss": "https:\/\/cognito-idp.us-west-2.amazonaws.com\/us-west-2_CoIS7kwaJ",
		"cognito:username": "miguel",
		"exp": 1529391014,
		"iat": 1529387414,
		"email": "gominolas@gmail.com"
	  }
	},
	"refreshToken": {
	  "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.1SFd9oxiTbek15uOP4vwQuDGoxZeOfJnl2prePKFpsZQ_j28Bi6-OVenLDREIAxMN8t5sDPlzRTun9R4IPJnKyedg2ZxozuySEUK_1xr3JfE2Bvm0zU36GJLFBOV19ypC9z2N5SnZSpsGwX5PSq4egnmxCjuJ-f8-Qp17u2OH2gCm02uRsL7av-xe_NdjUEY5a4H7jDD5Z6LAJPic4sSBT1BL345P0-DGyAFWYZEfxh1tf10LRMAA1gNnfb9JPXmoxGTMorFoIZEF33A2GSwikKFcodwyTK-10l9y2z3euXa8WRnUmcLwdTQSMDBb5QI-GLtW8GT7ccjYxMeK0St2w.9Oxl7UPY0JBOMnWi.Px9Z6pWtyQtcxK6nNjkpwpO_KJVoze2SIEJwY2fE-R-fqSR6Lg8D6oJuukroOivCeIkHY7MjxJr8Xz58WRVBf8ndlc9_zyBDZq4xf3wZPz3K5dbJt02TWSIkUwzrql6tDrDGM6iyLy1z2MTV3_qAfEZs_1V7Hb0K0TesadKcytmrdTULEC0nL0jxqr-Gd8o-jyY1WhYTyd-p5Np0PXVTBCeZHPHK1qjRnzXJHmaFItPHC2-ps1Qo6OmzhIa619s0pBqAkmOAitqT_bWZ8LuJ_CsMRGHVLACdrZT32hAroQnfmtOQy_iY04DC9NJ1diGrOFVug0sRMVYI68nI1RJGSV6Q879UQFF9GW0Uli7ydwcKTVFP00ISPRxHPz24SqfAvT-HJ_OQox4DnvNsT4MyJw-n7oE2pExSf6nxZxOBdbQMhEA8cC10nKLeJrempBj6L-vteRqlefjM3s_osTKEiL7mfm_Bvmm6rTJk-luIgF2NfdMANHELnH0T1lKJNKlJ9nxllvVvTmksEl0gGyvBf4bh4MXSW7v-g0cOe9DCbAc6GudJbqWfGxUakXnTrYkRoVX5bXpPCSj8at5HoqTqlKyEb8nGqiB4_g-kDbOp-TQn553jxxC5y2FC5jnAsXBZ2tDXoEEC8O_326PsKskFttpbn0bz9feQSYafqKt4NRSP_Bdrqy_7U2EqNOVzdvTlY9IC9_7Z0r9lDq6eksuQEHGrairwAdsXklOQJ1M95JPM--_FMJjAgxcRzSHMXjCvfYfJFW7aeuXGazY1XfBh24UsrHmsEXz72KX5y6OZSEIA3d-Qb9lUOvJT2BDHXcTBm30AB4IDhS5skWFsBShk8sIG15hFjfkaxbHUdfP2xtVoeWG8oRZLqoXNYW9dkQc2SXyg7MDU3wXjjWJ2-YENrFELW7bcuR0YCkvX2lfkoesyGuN9GOPj4tNHtJ3AAZzLK5GCBw-zKlBKoOLEdeOSrYLwATPaqUNwlUCq_p9QiAnDfydu2gIaRH5wDPSJOEJE8CQN-QL0jvC478UhPaAVnok9SxqrG6AH_AIEdiNl0BY41kfvR2e8N9N3tRIRbLvD7uKrMMX4B-F5XP2WgHGUzYMLyNnlZhQ9nMoUeSvLbaj_PRqsAZyHfozzHktTO8uMBlaHbcCy9tMKVBZnGBk0CE9HUFrYUP99rMCViF5KWLd_bGI-j5oXW_wT8HjhN-ZBitKLuKgmToA08sdkeXLgMtvMCQpHWr9nFLM-wdD3IrKQnnpn-tJRVShoiXAKeozSA0Z_.gw7k1pyZt19ngLh-WVEITA"
	},
	"accessToken": {
	  "jwtToken": "eyJraWQiOiI4VGVqVnRDZmJpUTVFS1ZZSkVWY2tDVUxMcUFDYWxNZFM3QVwvRGhTUFViUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiNGI4YWZjMC00OTRmLTQ4YTYtYmU0OC1hMjE4ZGMwNWJjOGUiLCJldmVudF9pZCI6ImEyY2UzMzg4LTczODQtMTFlOC1iYjE2LTE3ZDRmY2E4ZTg1YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MjkzODc0MTQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX0NvSVM3a3dhSiIsImV4cCI6MTUyOTM5MTAxNCwiaWF0IjoxNTI5Mzg3NDE0LCJqdGkiOiJiODE3NjhkYS0xYjdmLTRhM2QtODkyZS04ZTdjOWQ0NDhjM2YiLCJjbGllbnRfaWQiOiI0NjltaTFtODFtcm4zczVtMGNuMG5qcDIybCIsInVzZXJuYW1lIjoibWlndWVsIn0.IZaNz3foypUsmqXj8uPxcIOUE-FbWi9LpoMvLLiicyOPQ6QKvlJbE_m5Z6AYtBdDzZ7m7XHFMd8IYQQjHmBRvgjtJ93CTUGvw_o0DKkJ98jsJyYw_SE5QSBzLux9PMBE4sHqV0vZZPaU6Ism3kJIMBko-dEZsDS8CfaF2XdQVY8ccoQDejZkwO84GBXwuTRORqUBAN1N5IAvOT0cocg5H3n7LhHLwz3zlwHOxPjwsjndJql4qYMeP4Sv7QGFZEYNjrsaUb2Q3IvNkgTnwuUHtQnWmkKRj59OkYx3jhhFiTQrR3771ws2ZPpKZ9pKl2azKAXE6BvPlKDCAiLyqQwNQw",
	  "payload": {
		"sub": "b4b8afc0-494f-48a6-be48-a218dc05bc8e",
		"event_id": "a2ce3388-7384-11e8-bb16-17d4fca8e85a",
		"token_use": "access",
		"scope": "aws.cognito.signin.user.admin",
		"auth_time": 1529387414,
		"iss": "https:\/\/cognito-idp.us-west-2.amazonaws.com\/us-west-2_CoIS7kwaJ",
		"exp": 1529391014,
		"iat": 1529387414,
		"jti": "b81768da-1b7f-4a3d-892e-8e7c9d448c3f",
		"client_id": "469mi1m81mrn3s5m0cn0njp22l",
		"username": "miguel"
	  }
	},
	"clockDrift": 0
  }

  */
