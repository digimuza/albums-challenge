export interface IConfig {
  environment: "DEV" | "PRODUCTION";
  apiUrl: string;
}

const dev: IConfig = {
  environment: "DEV",
  apiUrl: "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
};

const prod: IConfig = {
  environment: "PRODUCTION",
  apiUrl: "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default config;
