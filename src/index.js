import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
// import './localization/i18n';
import App from "./App";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ar from "javascript-time-ago/locale/ar-AE";
import { Provider } from "react-redux";
import { AppContainer } from 'react-hot-loader'

import GetCountriesData from "./api/getCountryData";
// import store from "./store";
import ReactGA from "react-ga";
import getLastWeekData from "./api/getLastWeekData";
import detectCountry from "./api/detectCountry";

import store from './store'
import { ConnectedRouter } from 'connected-react-router'
import {history} from './store'
ReactGA.initialize("UA-165375572-1");
ReactGA.pageview(window.location.pathname + window.location.search);
JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(ar);

store.dispatch(GetCountriesData());
store.dispatch(getLastWeekData());
store.dispatch(detectCountry());


const render = () => ReactDOM.render(
    <AppContainer>
  <Provider store={store}>
  <ConnectedRouter  history={history}>
    <div>
    <App />
    </div>
  </ConnectedRouter>
  </Provider>
    </AppContainer>
  ,
  document.getElementById("root")
);
render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
