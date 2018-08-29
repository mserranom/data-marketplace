import {
  FETCH_SUBSCRIPTIONS_REQUESTED,
  FETCH_SUBSCRIPTIONS_SUCCEEDED,
  FETCH_SUBSCRIPTIONS_FAILED,
  SUBSCRIBE_REQUESTED,
  SUBSCRIBE_REQUEST_SUCCEEDED,
  SUBSCRIBE_REQUEST_FAILED,
  UNSUBSCRIBE_REQUEST_FAILED,
  UNSUBSCRIBE_REQUESTED,
  UNSUBSCRIBE_REQUEST_SUCCEEDED,
  Action
} from "./actions";
import { StateSubscriptions } from "../../types";

function assign(
  state: StateSubscriptions,
  newProps: unknown
): StateSubscriptions {
  return Object.assign<unknown, StateSubscriptions, unknown>(
    {},
    state,
    newProps
  );
}

function reduce(
  state: StateSubscriptions,
  action: Action
): StateSubscriptions | undefined {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCEEDED:
      return assign(state, {
        allSubscriptions: action.subscriptions
      });
    case FETCH_SUBSCRIPTIONS_FAILED:
    case SUBSCRIBE_REQUEST_FAILED:
    case UNSUBSCRIBE_REQUEST_FAILED:
      return assign(state, {
        backendErrorMessage: action.errorMessage
      });
    case FETCH_SUBSCRIPTIONS_REQUESTED:
    case SUBSCRIBE_REQUESTED:
    case SUBSCRIBE_REQUEST_SUCCEEDED:
    case UNSUBSCRIBE_REQUESTED:
    case UNSUBSCRIBE_REQUEST_SUCCEEDED:
      return state;
  }
}

export default function(
  state: StateSubscriptions,
  action: Action
): StateSubscriptions {
  if (!state) {
    return {};
  }

  const result = reduce(state, action);
  return result ? result : state;
}
