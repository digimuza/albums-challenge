import { connect } from "react-redux";
import { IAppState } from "src/store";
import {
  getFilteredFeedList,
  fetchFeeds,
  FeedFilter,
  testFilter
} from "src/modules/Feed";
import {
  setFilter,
  removeFilter
} from "src/modules/Feed/actions/feedFiltering";

const mapStateToProps = (state: IAppState) => {
  return { feeds: getFilteredFeedList(state), testFilter: testFilter(state) };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFeeds: () => dispatch(fetchFeeds()),
    setFilter: (groupId: string, filterId: string, filter: FeedFilter) => {
      dispatch(setFilter(groupId, filterId, filter));
    },
    removeFilter: (groupId: string, filterId: string) => {
      dispatch(removeFilter(groupId, filterId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
