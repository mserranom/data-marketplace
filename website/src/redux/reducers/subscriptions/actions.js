import backend from "../../backend";

export const SUBSCRIBE_REQUESTED = "SUBSCRIBE_REQUESTED";
export const SUBSCRIBE_REQUEST_SUCCEEDED = "SUBSCRIBE_REQUEST_SUCCEEDED";
export const SUBSCRIBE_REQUEST_FAILED = "SUBSCRIBE_REQUEST_FAILED";

export const UNSUBSCRIBE_REQUESTED = "UNSUBSCRIBE_REQUESTED";
export const UNSUBSCRIBE_REQUEST_SUCCEEDED = "UNSUBSCRIBE_REQUEST_SUCCEEDED";
export const UNSUBSCRIBE_REQUEST_FAILED = "UNSUBSCRIBE_REQUEST_FAILED";

export const FETCH_SUBSCRIPTIONS_REQUESTED = "FETCH_SUBSCRIPTIONS_REQUESTED";
export const FETCH_SUBSCRIPTIONS_SUCCEEDED = "FETCH_SUBSCRIPTIONS_SUCCEEDED";
export const FETCH_SUBSCRIPTIONS_FAILED = "FETCH_SUBSCRIPTIONS_FAILED";

export function subscribeRequested(configKey) {
  return { type: SUBSCRIBE_REQUESTED, configKey };
}

export function subscribeRequestSucceeded(configKey) {
  return { type: SUBSCRIBE_REQUEST_SUCCEEDED, configKey };
}

export function subscribeRequestFailed(errorMessage, configKey) {
  return { type: SUBSCRIBE_REQUEST_FAILED, errorMessage, configKey };
}

export function subscribe(userId, configId) {
  const configKey = `${userId}/${configId}`;
  return async function(dispatch) {
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

export function unsubscribeRequested(configKey) {
  return { type: UNSUBSCRIBE_REQUESTED, configKey };
}

export function unsubscribeRequestSucceeded(configKey) {
  return { type: UNSUBSCRIBE_REQUEST_SUCCEEDED, configKey };
}

export function unsubscribeRequestFailed(errorMessage, configKey) {
  return { type: UNSUBSCRIBE_REQUEST_FAILED, errorMessage, configKey };
}

export function unsubscribe(userId, configId) {
  const configKey = `${userId}/${configId}`;
  return async function(dispatch) {
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

export function fetchSubscriptionsRequested() {
  return { type: FETCH_SUBSCRIPTIONS_REQUESTED };
}

export function fetchSubscriptionsSucceeded(subscriptions) {
  return { type: FETCH_SUBSCRIPTIONS_SUCCEEDED, subscriptions };
}

export function fetchSubscriptionsFailed(errorMessage) {
  return { type: FETCH_SUBSCRIPTIONS_FAILED, errorMessage };
}

export function fetchSubscriptions() {
  return async function(dispatch) {
    try {
      dispatch(fetchSubscriptionsRequested());
      const subscriptions = await backend("/subscriptions?full_content=true");
      subscriptions.forEach(x => (x.isSubscribed = true)); // we force the property, since we can expect all items are subscribed
      dispatch(fetchSubscriptionsSucceeded(subscriptions));
    } catch (errorMessage) {
      dispatch(fetchSubscriptionsFailed(errorMessage));
    }
  };
}
