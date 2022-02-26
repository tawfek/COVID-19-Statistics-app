import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import GetCountriesData from "./api/getCountryData";
import ReactGA from "react-ga";
import getLastWeekData from "./api/getLastWeekData";

import store from "./store";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";
import { GOOGLE_ANALYTICS_ID } from "./config";

ReactGA.initialize(GOOGLE_ANALYTICS_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

store.dispatch(GetCountriesData());
store.dispatch(getLastWeekData());

const render = () =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <App />
          </div>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept("./App", () => {
    render();
  });
}
