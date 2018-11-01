import * as React from "react";
import View from "../View";
import connector from "./connector";
import { IFeed } from "src/modules/Api";
import "./styles.css";

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
    return (
      <View>
        <div className="grid">
          <div className="header">asd</div>
          <div className="side-navigation">dasdasd</div>
          <div className="main-content">dasdasd</div>
          <div className="footer">asd</div>
        </div>
      </View>
    );
  }
}

export default connector(SearchView);
