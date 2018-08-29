import {
  ALL_FEEDS_REQUESTED,
  ALL_FEEDS_REQUEST_SUCCEEDED,
  ALL_FEEDS_REQUEST_FAILED,
  FEED_TO_DISPLAY_REQUESTED,
  FEED_TO_DISPLAY_REQUEST_SUCCEEDED,
  FEED_TO_DISPLAY_REQUEST_FAILED,
  Action
} from "./actions";
import { StateNavigation } from "../../types";

function reduce(
  state: StateNavigation,
  action: Action
): StateNavigation | undefined {
  switch (action.type) {
    case ALL_FEEDS_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        allFeeds: action.feeds
      });
    case FEED_TO_DISPLAY_REQUESTED:
      return Object.assign({}, state, {
        feedToDisplay: undefined
      });
    case FEED_TO_DISPLAY_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        feedToDisplay: action.config
      });
    case ALL_FEEDS_REQUEST_FAILED:
    case FEED_TO_DISPLAY_REQUEST_FAILED:
      return Object.assign({}, state, {
        backendErrorMessage: action.errorMessage
      });
    case ALL_FEEDS_REQUESTED:
      return state;
  }
}

export default function(
  state: StateNavigation,
  action: Action
): StateNavigation {
  if (!state) {
    return {};
  }

  const result = reduce(state, action);
  return result ? result : state;
}
