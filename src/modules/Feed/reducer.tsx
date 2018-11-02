import { IFeed } from "../Api";
import { FeedStateActions } from "./actions";
import { ISetFilter, IRemoveFilter } from "./actions/feedFiltering";

export type FeedFilter = (feed: IFeed, index: number, list: IFeed[]) => boolean;

export interface IFeedFilterList {
  [param: string]: FeedFilter | undefined;
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
  show: 12
};

export const feedsReducer = (
  state: IFeedsState = initialState,
  action: FeedStateActions
) => {
  switch (action.type) {
    case "set_filter":
      return setFilter(state, action);
    case "remove_filter":
      return removeFilter(state, action);
    case "fetch_feeds_start":
      return { ...state, isFetching: true };
    case "fetch_feeds_error":
      console.error(action.payload);
      return { ...state, isFetching: false };
    case "fetch_feeds_success":
      return { ...state, feeds: action.payload, isFetching: false };
  }
  return state;
};

const setFilter = (state: IFeedsState, action: ISetFilter) => {
  if (!state.filtersGroup[action.payload.groupId]) {
    state.filtersGroup[action.payload.groupId] = {};
  }
  state.filtersGroup[action.payload.groupId][action.payload.filterId] =
    action.payload.filter;

  return { ...state };
};

const removeFilter = (state: IFeedsState, action: IRemoveFilter) => {
  if (state.filtersGroup[action.payload.groupId]) {
    if (state.filtersGroup[action.payload.groupId][action.payload.filterId]) {
      state.filtersGroup[action.payload.groupId][
        action.payload.filterId
      ] = undefined;
    }
  }

  return { ...state };
};
