import { IPayload } from "src/store/reducers";
import { FeedFilter } from "../../reducer";

export type FilterActions = ISetFilter | IRemoveFilter;

export interface ISetFilter extends IPayload {
  type: "set_filter";
  payload: {
    filterId: string;
    groupId: string;
    filter: FeedFilter;
  };
}

export const setFilter = (
  groupId: string,
  filterId: string,
  filter: FeedFilter
): ISetFilter => {
  return {
    type: "set_filter",
    payload: {
      filterId,
      groupId,
      filter
    }
  };
};

export interface IRemoveFilter extends IPayload {
  type: "remove_filter";
  payload: {
    filterId: string;
    groupId: string;
  };
}

export const removeFilter = (
  groupId: string,
  filterId: string
): IRemoveFilter => {
  return {
    type: "remove_filter",
    payload: {
      filterId,
      groupId
    }
  };
};
