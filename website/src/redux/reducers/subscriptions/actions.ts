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

function subscribeRequested(configKey: string) {
  return { type: SUBSCRIBE_REQUESTED, configKey };
}

function subscribeRequestSucceeded(configKey: string) {
  return { type: SUBSCRIBE_REQUEST_SUCCEEDED, configKey };
}

function subscribeRequestFailed(errorMessage: string, configKey: string) {
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

function unsubscribeRequested(configKey: string) {
  return { type: UNSUBSCRIBE_REQUESTED, configKey };
}

function unsubscribeRequestSucceeded(configKey: string) {
  return { type: UNSUBSCRIBE_REQUEST_SUCCEEDED, configKey };
}

function unsubscribeRequestFailed(errorMessage: string, configKey: string) {
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

function fetchSubscriptionsRequested() {
  return { type: FETCH_SUBSCRIPTIONS_REQUESTED };
}

function fetchSubscriptionsSucceeded(subscriptions: ConfigData[]) {
  return { type: FETCH_SUBSCRIPTIONS_SUCCEEDED, subscriptions };
}

function fetchSubscriptionsFailed(errorMessage: string) {
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

type Action =
  | ReturnType<typeof subscribeRequested>
  | ReturnType<typeof subscribeRequestSucceeded>
  | ReturnType<typeof subscribeRequestFailed>
  | ReturnType<typeof unsubscribeRequested>
  | ReturnType<typeof unsubscribeRequestSucceeded>
  | ReturnType<typeof unsubscribeRequestFailed>
  | ReturnType<typeof fetchSubscriptionsRequested>
  | ReturnType<typeof fetchSubscriptionsSucceeded>
  | ReturnType<typeof fetchSubscriptionsFailed>;
