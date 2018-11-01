import { IFeed } from "../Api";
import { FeedStateActions } from "./actions";

export type FeedFilter = (feed: IFeed, index: number, list: IFeed[]) => boolean;

export interface IFeedFilterList {
  [param: string]: FeedFilter;
}

export interface IFeedFilterGroup {
  [param: string]: IFeedFilterList;
}

export interface IFeedsState {
  isFetching: boolean;
  feeds: IFeed[];
  filtersGroup: IFeedFilterGroup;
  offset: number;
  show: number;
}

const initialState: IFeedsState = {
  isFetching: false,
  feeds: [],
  filtersGroup: {},
  offset: 0,
  show: 10
};

export const feedsReducer = (
  state: IFeedsState = initialState,
  action: FeedStateActions
) => {
  switch (action.type) {
    case "fetch_feeds_start":
      return { ...state, isFetching: true };
    case "fetch_feeds_error":
      console.error(action.payload);
      return { ...state, isFetching: false };
    case "fetch_feeds_success":
      return { ...state, feeds: action.payload };
  }
  return state;
};
