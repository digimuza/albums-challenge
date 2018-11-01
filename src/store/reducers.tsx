import { combineReducers } from "redux";
import { IAppState } from "./state";
import { feedsReducer as feeds } from "src/modules/Feed";
export interface IPayload {
  type: string;
  payload?: any;
}

export default combineReducers<IAppState>({
  feeds
});
