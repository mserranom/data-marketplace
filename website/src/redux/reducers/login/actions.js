import {
  confirmUser,
  signupUser,
  loginUser,
  signout
} from "../../../aws/login";

export const SIGNUP_FORM_OPENED = "SIGNUP_FORM_OPENED";
export const SIGNUP_REQUESTED = "SIGNUP_REQUESTED";
export const SIGNUP_SUCCEEDED = "SIGNUP_SUCCEEDED";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export const SIGNUP_CONFIRMATION_REQUESTED = "SIGNUP_CONFIRMATION_REQUESTED";
export const SIGNUP_CONFIRMATION_SUCCEEDED = "SIGNUP_CONFIRMATION_SUCCEEDED";
export const SIGNUP_CONFIRMATION_FAILED = "SIGNUP_CONFIRMATION_FAILED";

export const LOGIN_FORM_OPENED = "LOGIN_FORM_OPENED";
export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const SIGNED_OUT_SUCCEEEDED = "SIGNED_OUT_SUCCEEEDED";

export function signupFormOpened() {
  return { type: SIGNUP_FORM_OPENED };
}

export function signupRequested(username, password) {
  return { type: SIGNUP_REQUESTED, username, password };
}

export function signupSucceeded(cognitoUser) {
  // cognitoUser needed further in the signup process
  return { type: SIGNUP_SUCCEEDED, cognitoUser };
}

export function signupFailed(errorMessage) {
  return { type: SIGNUP_FAILED, errorMessage };
}

export function signupConfirmationRequested() {
  return { type: SIGNUP_CONFIRMATION_REQUESTED };
}

export function signupConfirmationSucceeded(token) {
  return { type: SIGNUP_CONFIRMATION_SUCCEEDED, token };
}

export function signupConfirmationFailed(errorMessage) {
  return { type: SIGNUP_CONFIRMATION_FAILED, errorMessage };
}

export function loginFormOpened() {
  return { type: LOGIN_FORM_OPENED };
}

export function loginRequested(username, password) {
  return { type: LOGIN_REQUESTED, username, password };
}

export function loginSucceeded(token) {
  return { type: LOGIN_SUCCEEDED, token };
}

export function loginFailed(errorMessage) {
  return { type: LOGIN_FAILED, errorMessage };
}

export function signedOutSucceeded() {
  return { type: SIGNED_OUT_SUCCEEEDED };
}

export function requestSignup(username, password, email) {
  return async function(dispatch) {
    dispatch(signupRequested(username, password));
    try {
      const cognitoUser = await signupUser(username, password, email);
      dispatch(signupSucceeded(cognitoUser));
    } catch (err) {
      dispatch(signupFailed(err));
    }
  };
}

export function requestSignupConfirmation(code) {
  return async function(dispatch, getState) {
    const { cognitoUser, username, password } = getState().login;
    dispatch(signupConfirmationRequested());
    try {
      await confirmUser(cognitoUser, code);
      const token = await loginUser(username, password);
      dispatch(signupConfirmationSucceeded(token));
    } catch (err) {
      console.log(err);
      dispatch(signupConfirmationFailed(err));
    }
  };
}

export function requestLogin(username, password) {
  return async function(dispatch) {
    dispatch(loginRequested(username, password));
    try {
      const token = await loginUser(username, password);
      dispatch(loginSucceeded(token));
    } catch (err) {
      dispatch(loginFailed(err));
    }
  };
}

export function requestSignout() {
  return async function(dispatch) {
    dispatch(signedOutSucceeded());
    signout();
  };
}
