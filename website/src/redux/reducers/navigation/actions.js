import backend from "../../backend";

export const ALL_FEEDS_REQUEST_SUCCEEDED = "ALL_FEEDS_REQUEST_SUCCEEDED";
export const ALL_FEEDS_REQUEST_FAILED = "ALL_FEEDS_REQUEST_FAILED";

export const FEED_TO_DISPLAY_REQUESTED = "FEED_TO_DISPLAY_REQUESTED";
export const FEED_TO_DISPLAY_REQUEST_SUCCEEDED =
  "FEED_TO_DISPLAY_REQUEST_SUCCEEDED";
export const FEED_TO_DISPLAY_REQUEST_FAILED = "FEED_TO_DISPLAY_REQUEST_FAILED";

export function allFeedsRequestSucceeded(feeds, tag) {
  return { type: ALL_FEEDS_REQUEST_SUCCEEDED, feeds, tag };
}

export function allFeedsRequestFailed(errorMessage) {
  return { type: ALL_FEEDS_REQUEST_FAILED, errorMessage };
}

export function feedToDisplayRequested() {
  return { type: FEED_TO_DISPLAY_REQUESTED };
}

export function feedToDisplayRequestSucceeded(config) {
  return { type: FEED_TO_DISPLAY_REQUEST_SUCCEEDED, config };
}

export function feedToDisplayRequestFailed(errorMessage) {
  return { type: FEED_TO_DISPLAY_REQUEST_FAILED, errorMessage };
}

export function requestAllFeeds(tag) {
  return async function(dispatch) {
    try {
      const endpoint = tag ? `/tags/${tag}` : "/config";
      const configs = await backend(endpoint);
      dispatch(allFeedsRequestSucceeded(configs, tag));
    } catch (err) {
      dispatch(allFeedsRequestFailed(err));
    }
  };
}

export function requestFeedToDisplay(userId, configId) {
  return async function(dispatch) {
    try {
      dispatch(feedToDisplayRequested());
      const config = await backend(`/user/${userId}/config/${configId}`);
      dispatch(feedToDisplayRequestSucceeded(config));
    } catch (err) {
      dispatch(feedToDisplayRequestFailed(err));
    }
  };
}
