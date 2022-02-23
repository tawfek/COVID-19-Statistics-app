import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore,combineReducers } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import root from './reducers/root'
import { connectRouter } from 'connected-react-router'


export const history = createBrowserHistory();
const routerMidd= routerMiddleware(history);
const reducers =( combineReducers({ root, router: connectRouter(history) }));

  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
  const store = createStore(reducers,composeEnhancer(applyMiddleware(routerMidd, thunk)));


  export default store;

