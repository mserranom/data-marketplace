export interface ConfigData {
  id: string;
  user_id: string;
  isSubscribed?: boolean;
  config: Config;
}

export interface Config {
  id: string;
  name: string;
  format: string;
  interval: number;
  url: string;
  tags: string[];
}

export interface Subscription {
  config_key: string;
}

export interface StateLogin {
  isLoggedIn?: boolean;
  username?: string;
}

export interface StateNavigation {
  allFeeds?: ConfigData[];
}

export interface StateSubscriptions {
  allFeeds?: ConfigData[];
}

export interface StateRoot {
  login: StateLogin;
  navigation: StateNavigation;
  subscriptions: StateSubscriptions;
}
