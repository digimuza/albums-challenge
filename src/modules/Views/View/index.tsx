import * as React from "react";

interface IProps {
  children?: any;
}

class View extends React.Component<IProps> {
  public render() {
    return <div>{this.props.children}</div>;
  }
}

export default View;
