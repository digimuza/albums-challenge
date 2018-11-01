import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const IGNORE_ACTIONS: string[] = [];
const customMiddleWare = () => (next: any) => (action: any) => {
  if (typeof action !== "function") {
    const inIgnoreList = IGNORE_ACTIONS.find(a => {
      return a === action.type;
    });

    if (inIgnoreList) {
      next(action);
      return;
    }
    console.log(action.type, action);
  }
  next(action);
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(customMiddleWare, thunk);

export default createStore(reducer, composeEnhancers(middleware));
