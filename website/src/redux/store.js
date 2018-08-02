import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  SIGNUP_FORM_OPENED,
  SIGNUP_REQUESTED,
  SIGNUP_SUCCEEDED,
  SIGNUP_FAILED,
  SIGNUP_CONFIRMATION_REQUESTED,
  SIGNUP_CONFIRMATION_SUCCEEDED,
  LOGIN_FORM_OPENED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  SIGNUP_CONFIRMATION_FAILED,
  SIGNED_OUT_SUCCEEEDED
} from "./reducers/login/actions";
import navigationReducer from "./reducers/navigation/reducer";

let username;

function reducer(state, action) {
  if (!state) {
    if (username) {
      return {
        isLoggedIn: true,
        username
      };
    } else {
      return {
        isLoggedIn: false
      };
    }
  }

  switch (action.type) {
    case SIGNUP_FORM_OPENED:
      return Object.assign({}, state, {
        signupErrorMessage: undefined,
        username: undefined,
        password: undefined
      });
    case SIGNUP_REQUESTED:
      return Object.assign({}, state, {
        isContactingCognito: true,
        username: action.username,
        password: action.password,
        signupErrorMessage: undefined
      });
    case SIGNUP_SUCCEEDED:
      return Object.assign({}, state, {
        isContactingCognito: false,
        requiresSignupConfirmation: true,
        cognitoUser: action.cognitoUser
      });
    case SIGNUP_FAILED:
      return Object.assign({}, state, {
        isContactingCognito: false,
        signupErrorMessage: action.errorMessage
      });
    case SIGNUP_CONFIRMATION_REQUESTED:
      return Object.assign({}, state, {
        isContactingCognito: true,
        signupErrorMessage: undefined
      });
    case SIGNUP_CONFIRMATION_SUCCEEDED:
      return Object.assign({}, state, {
        isContactingCognito: false,
        isLoggedIn: true
      });
    case SIGNUP_CONFIRMATION_FAILED:
      return Object.assign({}, state, {
        isContactingCognito: false,
        signupErrorMessage: action.errorMessage
      });
    case LOGIN_FORM_OPENED:
      return Object.assign({}, state, {
        signupErrorMessage: undefined,
        username: undefined,
        password: undefined
      });
    case LOGIN_REQUESTED:
      return Object.assign({}, state, {
        isContactingCognito: true,
        username: action.username,
        password: action.password,
        loginErrorMessage: undefined
      });
    case LOGIN_SUCCEEDED:
      return Object.assign({}, state, {
        isContactingCognito: false,
        isLoggedIn: true,
        password: "DELETED"
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isContactingCognito: false,
        loginErrorMessage: action.errorMessage,
        username: undefined,
        password: undefined
      });
    case SIGNED_OUT_SUCCEEEDED:
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: undefined,
        password: undefined
      });
    default:
      return state;
  }
}

// Store bootstrap

const loggerMiddleware = createLogger();

export const initStore = user => {
  username = user;
  return createStore(
    combineReducers({
      login: reducer,
      navigation: navigationReducer
    }),
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
      )
    )
  );
};
