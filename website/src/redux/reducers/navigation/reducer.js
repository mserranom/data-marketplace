import {
  ALL_FEEDS_REQUEST_SUCCEEDED,
  ALL_FEEDS_REQUEST_FAILED,
  FEED_TO_DISPLAY_REQUEST_SUCCEEDED,
  FEED_TO_DISPLAY_REQUEST_FAILED,
  FEED_TO_DISPLAY_REQUESTED
} from "./actions";

export default function(state, action) {
  if (!state) {
    return {};
  }

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
    default:
      return state;
  }
}
