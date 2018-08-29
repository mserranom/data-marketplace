import backend from "../../backend";
import { ConfigData, Subscription } from "../../types";
import { Dispatch } from "redux";

export const ALL_FEEDS_REQUESTED = "ALL_FEEDS_REQUESTED";
export const ALL_FEEDS_REQUEST_SUCCEEDED = "ALL_FEEDS_REQUEST_SUCCEEDED";
export const ALL_FEEDS_REQUEST_FAILED = "ALL_FEEDS_REQUEST_FAILED";

export const FEED_TO_DISPLAY_REQUESTED = "FEED_TO_DISPLAY_REQUESTED";
export const FEED_TO_DISPLAY_REQUEST_SUCCEEDED =
  "FEED_TO_DISPLAY_REQUEST_SUCCEEDED";
export const FEED_TO_DISPLAY_REQUEST_FAILED = "FEED_TO_DISPLAY_REQUEST_FAILED";

interface AllFeedsRequested {
  type: typeof ALL_FEEDS_REQUESTED;
  tag?: string;
}

export function allFeedsRequested(tag?: string): AllFeedsRequested {
  return { type: ALL_FEEDS_REQUESTED, tag };
}

interface AllFeedsRequestSucceeded {
  type: typeof ALL_FEEDS_REQUEST_SUCCEEDED;
  feeds: ConfigData[];
  tag?: string;
}

export function allFeedsRequestSucceeded(
  feeds: ConfigData[],
  tag?: string
): AllFeedsRequestSucceeded {
  return { type: ALL_FEEDS_REQUEST_SUCCEEDED, feeds, tag };
}

interface AllFeedsRequestFailed {
  type: typeof ALL_FEEDS_REQUEST_FAILED;
  errorMessage: string;
}

export function allFeedsRequestFailed(
  errorMessage: string
): AllFeedsRequestFailed {
  console.error("----> " + errorMessage);
  return { type: ALL_FEEDS_REQUEST_FAILED, errorMessage };
}

interface FeedToDisplayRequested {
  type: typeof FEED_TO_DISPLAY_REQUESTED;
}

export function feedToDisplayRequested(): FeedToDisplayRequested {
  return { type: FEED_TO_DISPLAY_REQUESTED };
}

interface FeedToDisplayRequestSucceeded {
  type: typeof FEED_TO_DISPLAY_REQUEST_SUCCEEDED;
  config: ConfigData;
}

export function feedToDisplayRequestSucceeded(
  config: ConfigData
): FeedToDisplayRequestSucceeded {
  return { type: FEED_TO_DISPLAY_REQUEST_SUCCEEDED, config };
}

interface FeedToDisplayRequestFailed {
  type: typeof FEED_TO_DISPLAY_REQUEST_FAILED;
  errorMessage: string;
}

export function feedToDisplayRequestFailed(
  errorMessage: string
): FeedToDisplayRequestFailed {
  return { type: FEED_TO_DISPLAY_REQUEST_FAILED, errorMessage };
}

function mergeSubscriptionsAndConfigs(
  subscriptions: Subscription[],
  configs: ConfigData[]
) {
  const subscriptionSet = new Set(subscriptions.map(x => x.config_key));
  configs.forEach(
    config =>
      (config.isSubscribed = subscriptionSet.has(
        `${config.user_id}/${config.id}`
      ))
  );
}

export function requestAllFeeds(tag?: string) {
  return async function(dispatch: Dispatch<Action>) {
    try {
      dispatch(allFeedsRequested(tag));
      const endpoint = tag ? `/tags/${tag}` : "/config";
      const [configs, subscriptions] = await Promise.all([
        backend(endpoint),
        backend("/subscriptions")
      ]);
      mergeSubscriptionsAndConfigs(subscriptions, configs);
      dispatch(allFeedsRequestSucceeded(configs, tag));
    } catch (err) {
      dispatch(allFeedsRequestFailed(err));
    }
  };
}

export function requestFeedToDisplay(userId: string, configId: string) {
  return async function(dispatch: Dispatch<Action>) {
    try {
      dispatch(feedToDisplayRequested());
      const config = await backend(`/user/${userId}/config/${configId}`);
      dispatch(feedToDisplayRequestSucceeded(config));
    } catch (err) {
      dispatch(feedToDisplayRequestFailed(err));
    }
  };
}

export type Action =
  | AllFeedsRequested
  | AllFeedsRequestSucceeded
  | AllFeedsRequestFailed
  | FeedToDisplayRequested
  | FeedToDisplayRequestSucceeded
  | FeedToDisplayRequestFailed;
