import { IPayload } from "src/store/reducers";
import { Dispatch } from "redux";
import { IFeed, getFeed } from "src/modules/Api";
import { FeedStateActions } from "../actions";

export type FetchFeedsActions =
  | IFetchFeedsSuccess
  | IFetchFeedsError
  | IFetchFeedsStart;

export interface IFetchFeedsSuccess extends IPayload {
  type: "fetch_feeds_success";
  payload: IFeed[];
}

export const fetchFeedSuccess = (feeds: IFeed[]): IFetchFeedsSuccess => {
  return {
    type: "fetch_feeds_success",
    payload: feeds
  };
};

export interface IFetchFeedsError extends IPayload {
  type: "fetch_feeds_error";
  payload: any;
}

export const fetchFeedError = (err: any): IFetchFeedsError => {
  return {
    type: "fetch_feeds_error",
    payload: err
  };
};

export interface IFetchFeedsStart extends IPayload {
  type: "fetch_feeds_start";
}

export const fetchFeedStart = (): IFetchFeedsStart => {
  return {
    type: "fetch_feeds_start"
  };
};

export const fetchFeeds = () => {
  return (dispatch: Dispatch<FeedStateActions>) => {
    dispatch(fetchFeedStart());
    getFeed()
      .then(result => dispatch(fetchFeedSuccess(result)))
      .catch(err => dispatch(fetchFeedError(err)));
  };
};
