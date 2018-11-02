import * as React from "react";
import View from "../View";
import connector from "./connector";
import { IFeed } from "src/modules/Api";
import "./styles.css";
import { FeedList } from "./components/FeedList";
import { FilterGroup } from "./components/FilterGroup";
import { Paper } from "@material-ui/core";
import { priceFilterGroup, yearFilterGroup } from "./filters";
import { FeedFilter } from "src/modules/Feed";

interface IProps {
  children?: any;
  feeds: IFeed[];
  testFilter: (
    groupId: string,
    filterId: string,
    filter: FeedFilter
  ) => IFeed[];
  fetchFeeds: () => void;
  setFilter: (groupId: string, filterId: string, filter: FeedFilter) => void;
  removeFilter: (groupId: string, filterId: string) => void;
}

class SearchView extends React.Component<IProps> {
  public componentWillMount() {
    this.props.fetchFeeds();
  }
  public render() {
    return (
      <View>
        <div className="content-container">
          <div className="col column1">
            <div className="space-bottom">
              <Paper elevation={5}>
                <FilterGroup
                  testFilter={this.props.testFilter}
                  removeFilter={this.props.removeFilter}
                  setFilter={this.props.setFilter}
                  feeds={this.props.feeds}
                  filterGroupData={priceFilterGroup()}
                />
              </Paper>
            </div>
            <div>
              <Paper elevation={5}>
                <FilterGroup
                  testFilter={this.props.testFilter}
                  removeFilter={this.props.removeFilter}
                  setFilter={this.props.setFilter}
                  feeds={this.props.feeds}
                  filterGroupData={yearFilterGroup()}
                />
              </Paper>
            </div>
          </div>
          <div className="col column1">
            <div>
              <Paper elevation={5}>
                <div className="feed-list">
                  <FeedList feeds={this.props.feeds} />
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </View>
    );
  }
}

export default connector(SearchView);
