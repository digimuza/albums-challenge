import { connect } from "react-redux";
import { IAppState } from "src/store";
import { getFilteredFeedList, fetchFeeds } from "src/modules/Feed";

const mapStateToProps = (state: IAppState) => {
  return { feeds: getFilteredFeedList(state) };
};

const mapDispatchToProps = (dispatch: any) => {
  return { fetchFeeds: () => dispatch(fetchFeeds()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
