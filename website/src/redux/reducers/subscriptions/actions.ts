import backend from "../../backend";
import { Dispatch } from "redux";
import { ConfigData } from "../../types";

export const SUBSCRIBE_REQUESTED = "SUBSCRIBE_REQUESTED";
export const SUBSCRIBE_REQUEST_SUCCEEDED = "SUBSCRIBE_REQUEST_SUCCEEDED";
export const SUBSCRIBE_REQUEST_FAILED = "SUBSCRIBE_REQUEST_FAILED";

export const UNSUBSCRIBE_REQUESTED = "UNSUBSCRIBE_REQUESTED";
export const UNSUBSCRIBE_REQUEST_SUCCEEDED = "UNSUBSCRIBE_REQUEST_SUCCEEDED";
export const UNSUBSCRIBE_REQUEST_FAILED = "UNSUBSCRIBE_REQUEST_FAILED";

export const FETCH_SUBSCRIPTIONS_REQUESTED = "FETCH_SUBSCRIPTIONS_REQUESTED";
export const FETCH_SUBSCRIPTIONS_SUCCEEDED = "FETCH_SUBSCRIPTIONS_SUCCEEDED";
export const FETCH_SUBSCRIPTIONS_FAILED = "FETCH_SUBSCRIPTIONS_FAILED";

interface SubscribeRequested {
  type: typeof SUBSCRIBE_REQUESTED;
  configKey: string;
}

function subscribeRequested(configKey: string): SubscribeRequested {
  return { type: SUBSCRIBE_REQUESTED, configKey };
}

interface SubscribeRequestSuceeded {
  type: typeof SUBSCRIBE_REQUEST_SUCCEEDED;
  configKey: string;
}

function subscribeRequestSucceeded(
  configKey: string
): SubscribeRequestSuceeded {
  return { type: SUBSCRIBE_REQUEST_SUCCEEDED, configKey };
}

interface SubscribeRequestFailed {
  type: typeof SUBSCRIBE_REQUEST_FAILED;
  errorMessage: string;
  configKey: string;
}

function subscribeRequestFailed(
  errorMessage: string,
  configKey: string
): SubscribeRequestFailed {
  return { type: SUBSCRIBE_REQUEST_FAILED, errorMessage, configKey };
}

export function subscribe(userId: string, configId: string) {
  const configKey = `${userId}/${configId}`;
  return async function(dispatch: Dispatch<Action>) {
    try {
      dispatch(subscribeRequested(configKey));
      await backend("/subscriptions", "POST", {
        config_key: configKey
      });
      dispatch(subscribeRequestSucceeded(configKey));
    } catch (errorMessage) {
      dispatch(subscribeRequestFailed(errorMessage, configKey));
    }
  };
}

interface UnsubscribeRequested {
  type: typeof UNSUBSCRIBE_REQUESTED;
  configKey: string;
}

function unsubscribeRequested(configKey: string): UnsubscribeRequested {
  return { type: UNSUBSCRIBE_REQUESTED, configKey };
}

interface UnsubscribeRequestSucceeded {
  type: typeof UNSUBSCRIBE_REQUEST_SUCCEEDED;
  configKey: string;
}

function unsubscribeRequestSucceeded(
  configKey: string
): UnsubscribeRequestSucceeded {
  return { type: UNSUBSCRIBE_REQUEST_SUCCEEDED, configKey };
}

interface UnsubscribeRequestFailed {
  type: typeof UNSUBSCRIBE_REQUEST_FAILED;
  configKey: string;
  errorMessage: string;
}

function unsubscribeRequestFailed(
  errorMessage: string,
  configKey: string
): UnsubscribeRequestFailed {
  return { type: UNSUBSCRIBE_REQUEST_FAILED, errorMessage, configKey };
}

export function unsubscribe(userId: string, configId: string) {
  const configKey = `${userId}/${configId}`;
  return async function(dispatch: Dispatch<Action>) {
    try {
      dispatch(unsubscribeRequested(configKey));
      await backend("/subscriptions", "DELETE", {
        config_key: configKey
      });
      dispatch(unsubscribeRequestSucceeded(configKey));
    } catch (errorMessage) {
      dispatch(unsubscribeRequestFailed(errorMessage, configKey));
    }
  };
}

interface FetchSubscriptionRequested {
  type: typeof FETCH_SUBSCRIPTIONS_REQUESTED;
}

function fetchSubscriptionsRequested(): FetchSubscriptionRequested {
  return { type: FETCH_SUBSCRIPTIONS_REQUESTED };
}

interface FetchSubscriptionsSucceeded {
  type: typeof FETCH_SUBSCRIPTIONS_SUCCEEDED;
  subscriptions: ConfigData[];
}

function fetchSubscriptionsSucceeded(
  subscriptions: ConfigData[]
): FetchSubscriptionsSucceeded {
  return { type: FETCH_SUBSCRIPTIONS_SUCCEEDED, subscriptions };
}

interface FetchSubscriptionsFailed {
  type: typeof FETCH_SUBSCRIPTIONS_FAILED;
  errorMessage: string;
}

function fetchSubscriptionsFailed(
  errorMessage: string
): FetchSubscriptionsFailed {
  return { type: FETCH_SUBSCRIPTIONS_FAILED, errorMessage };
}

export function fetchSubscriptions() {
  return async function(dispatch: Dispatch<Action>) {
    try {
      dispatch(fetchSubscriptionsRequested());
      const subscriptions: ConfigData[] = await backend(
        "/subscriptions?full_content=true"
      );
      subscriptions.forEach(x => (x.isSubscribed = true)); // we force the property, since we can expect all items are subscribed
      dispatch(fetchSubscriptionsSucceeded(subscriptions));
    } catch (errorMessage) {
      dispatch(fetchSubscriptionsFailed(errorMessage));
    }
  };
}

export type Action =
  | SubscribeRequested
  | SubscribeRequestSuceeded
  | SubscribeRequestFailed
  | UnsubscribeRequested
  | UnsubscribeRequestSucceeded
  | UnsubscribeRequestFailed
  | FetchSubscriptionRequested
  | FetchSubscriptionsSucceeded
  | FetchSubscriptionsFailed;
