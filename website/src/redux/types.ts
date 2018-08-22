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

export interface StateRoot {}
