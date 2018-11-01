import { IFeedFilterList, FeedFilter, IFeedFilterGroup } from "./reducer";
import { IFeed } from "../Api";
import { IAppState } from "src/store";

export const getFilteredFeedList = (state: IAppState): IFeed[] => {
  const feedsState = state.feeds;
  return feedsState.feeds
    .filter(bigFilter(feedsState.filtersGroup))
    .slice(feedsState.offset, feedsState.offset + feedsState.show - 1);
};

const feedFiltersListToArray = (feedFilterList: IFeedFilterList) => {
  return Object.keys(feedFilterList)
    .map(k => feedFilterList[k])
    .filter(f => !!f) as FeedFilter[];
};

const bigFilter = (filtersGroup: IFeedFilterGroup): FeedFilter => {
  const groupFilters = Object.keys(filtersGroup).map(f => {
    return orFilterMerge(feedFiltersListToArray(filtersGroup[f]));
  });

  return andFilterMerge(groupFilters);
};

const orFilterMerge = (filerList: FeedFilter[]): FeedFilter => {
  return (feed: IFeed, index: number, list: IFeed[]) => {
    return filerList.filter(f => f(feed, index, list)).length !== 0;
  };
};

const andFilterMerge = (filerList: FeedFilter[]): FeedFilter => {
  return (feed: IFeed, index: number, list: IFeed[]) => {
    return filerList.filter(f => !f(feed, index, list)).length === 0;
  };
};
