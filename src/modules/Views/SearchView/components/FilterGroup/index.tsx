import * as React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import "./styles.css";
import { IFilterGroupData } from "../../filters";
import { IFeed } from "src/modules/Api";
import { FeedFilter } from "src/modules/Feed";
import * as _ from "lodash";
interface IProps {
  feeds: IFeed[];
  filterGroupData: IFilterGroupData;
  setFilter: (groupId: string, filterId: string, filter: FeedFilter) => void;
  removeFilter: (groupId: string, filterId: string) => void;
  testFilter: (
    groupId: string,
    filterId: string,
    filter: FeedFilter
  ) => IFeed[];
}

interface IState {
  checked: {
    [param: string]: boolean;
  };
}

export class FilterGroup extends React.Component<IProps, IState> {
  public state = {
    checked: {}
  };
  public onCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const newState = _.cloneDeep(this.state);
    const filterId = event.target.value;
    const groupId = this.props.filterGroupData.id;
    if (checked) {
      const filter = this.props.filterGroupData.elements[filterId].filter;
      this.props.setFilter(groupId, filterId, filter);
      newState.checked[filterId] = true;
    } else {
      this.props.removeFilter(groupId, filterId);
      newState.checked[filterId] = false;
    }
    this.setState(newState);
  };
  public render() {
    return (
      <div className="FilterGroup">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {this.props.filterGroupData.label}
          </FormLabel>
          <FormGroup>{this.renderCheckboxList()}</FormGroup>
        </FormControl>
      </div>
    );
  }

  private renderCheckboxList() {
    return Object.keys(this.props.filterGroupData.elements).map(id => {
      const filter = this.props.filterGroupData.elements[id].filter;
      const groupId = this.props.filterGroupData.id;
      const afterApply = this.props
        .testFilter(groupId, id, filter)
        .filter(filter).length;
      if (afterApply === 0) {
        return null;
      }

      return (
        <FormControlLabel
          key={id}
          label={`${
            this.props.filterGroupData.elements[id].label
          } (${afterApply})`}
          control={<Checkbox value={id} onChange={this.onCheckBoxChange} />}
        />
      );
    });
  }
}
