import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import * as React from "react";
import { IFeed } from "src/modules/Api";
import { Divider, Avatar } from "@material-ui/core";
import "./styles.css";
interface IProps {
  feeds: IFeed[];
}

export const FeedList = ({ feeds }: IProps) => {
  return <List>{renderList(feeds)}</List>;
};

const renderList = (feeds: IFeed[]) => {
  return feeds.map((f, index) => {
    const showDivider = () => {
      if (index === feeds.length - 1) {
        return null;
      }
      return <Divider />;
    };
    return (
      <div key={index} className="list-item">
        <ListItem>
          <ListItemAvatar>
            <Avatar src={f.image} />
          </ListItemAvatar>
          <ListItemText primary={f.name} />
          <ListItemSecondaryAction>
            <div style={{ padding: 20 }}>{f.price.label}</div>
          </ListItemSecondaryAction>
        </ListItem>
        {showDivider()}
      </div>
    );
  });
};
