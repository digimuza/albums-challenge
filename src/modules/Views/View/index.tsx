import * as React from "react";
import "./styles.css";

interface IProps {
  children?: any;
}

class View extends React.Component<IProps> {
  public render() {
    return (
      <div className="main-container">
        <div className="layout">{this.props.children}</div>
      </div>
    );
  }
}

export default View;
