import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import * as React from "react";
import { IFeed } from "src/modules/Api";
import { Divider, Avatar } from "@material-ui/core";

interface IProps {
  feeds: IFeed[];
}

export const FeedList = ({ feeds }: IProps) => {
  return <List>{renderList(feeds)}</List>;
};

const renderList = (feeds: IFeed[]) => {
  return feeds.map((f, index) => {
    return (
      <div key={index}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={f.image} />
          </ListItemAvatar>
          <ListItemText primary={f.name} />
          <ListItemSecondaryAction>{f.price.label}</ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    );
  });
};
