import { IFeedFilterList, FeedFilter, IFeedFilterGroup } from "./reducer";
import { IFeed } from "../Api";
import { IAppState } from "src/store";
import * as _ from "lodash";
export const getFilteredFeedList = (state: IAppState): IFeed[] => {
  const feedsState = state.feeds;
  return feedsState.feeds.filter(bigFilter(feedsState.filtersGroup));
};

export const testFilter = (state: IAppState) => {
  return (groupId: string, filterId: string, filter: FeedFilter) => {
    const newState = _.cloneDeep(state);
    const feedsState = newState.feeds;
    const filtersGroup = newState.feeds.filtersGroup;
    if (filtersGroup[groupId]) {
      filtersGroup[groupId][filterId] = filter;
    } else {
      filtersGroup[groupId] = {};
      filtersGroup[groupId][filterId] = filter;
    }

    return feedsState.feeds.filter(bigFilter(filtersGroup));
  };
};

const feedFiltersListToArray = (feedFilterList: IFeedFilterList) => {
  return Object.keys(feedFilterList)
    .map(k => feedFilterList[k])
    .filter(f => !!f) as FeedFilter[];
};

const bigFilter = (filtersGroup: IFeedFilterGroup): FeedFilter => {
  const groupFilters = Object.keys(filtersGroup)
    .map(f => {
      const d = feedFiltersListToArray(filtersGroup[f]);
      if (d.length === 0) {
        return undefined;
      }
      return orFilterMerge(d);
    })
    .filter(d => !!d);

  if (groupFilters.length === 0) {
    return trueFilter();
  }
  const filters = groupFilters as FeedFilter[];
  return andFilterMerge(filters);
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

const trueFilter = (): FeedFilter => {
  return (feed: IFeed, index: number, list: IFeed[]) => {
    return true;
  };
};
