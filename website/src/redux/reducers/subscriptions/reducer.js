import {
  FETCH_SUBSCRIPTIONS_SUCCEEDED,
  FETCH_SUBSCRIPTIONS_FAILED,
  SUBSCRIBE_REQUEST_FAILED,
  UNSUBSCRIBE_REQUEST_FAILED
} from "./actions";

export default function(state, action) {
  if (!state) {
    return {};
  }

  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCEEDED:
      return Object.assign({}, state, {
        allSubscriptions: action.subscriptions
      });
    case FETCH_SUBSCRIPTIONS_FAILED:
    case SUBSCRIBE_REQUEST_FAILED:
    case UNSUBSCRIBE_REQUEST_FAILED:
      return Object.assign({}, state, {
        backendErrorMessage: action.errorMessage
      });
    default:
      return state;
  }
}
