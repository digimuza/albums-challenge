import * as React from "react";
import "./styles.css";

interface IProps {
  children?: any;
  isLoading?: boolean;
}

class View extends React.Component<IProps> {
  public render() {
    if (this.props.isLoading) {
      return null;
    }
    return (
      <div className="main-container">
        <div className="layout">{this.props.children}</div>
      </div>
    );
  }
}

export default View;
