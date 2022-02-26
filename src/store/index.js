import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import reducers from "./reducers";

export const history = createBrowserHistory();
const routerMidd = routerMiddleware(history);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers(history),
  composeEnhancer(applyMiddleware(routerMidd, thunk))
);

export default store;
