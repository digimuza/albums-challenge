import axios from "axios";
import { IFeed } from "./types";
import config from "src/config";

export const getFeed = (): Promise<IFeed[]> => {
  return new Promise((resolve, reject) => {
    axios.get(config.apiUrl).then(r => {
      const feeds = extractFeedsFromBody(r.data).filter(f => !!f) as IFeed[];
      resolve(feeds);
    });
  });
};

const extractFeedsFromBody = (rawBody: any) => {
  if (!rawBody.feed && !rawBody.feed.entry) {
    throw new Error("Invalid body");
  }

  const feeds: any[] = rawBody.feed.entry;

  return feeds.map(feed => {
    return feedTransform(feed);
  });
};

const feedTransform = (feed: any): IFeed | undefined => {
  try {
    const data = {
      name: feed["im:name"].label as string,
      price: parseFloat(feed["im:price"].attributes.amount),
      releaseDate: new Date(feed["im:releaseDate"].label)
    };

    return data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
