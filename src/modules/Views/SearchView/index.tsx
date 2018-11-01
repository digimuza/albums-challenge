import * as React from "react";
import View from "../View";
import connector from "./connector";
import { IFeed } from "src/modules/Api";

interface IProps {
  children?: any;
  feeds: IFeed[];
  fetchFeeds: () => void;
}

class SearchView extends React.Component<IProps> {
  public componentWillMount() {
    this.props.fetchFeeds();
  }
  public render() {
    return <View>cdasdjalksd</View>;
  }
}

export default connector(SearchView);
