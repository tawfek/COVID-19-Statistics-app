import React from "react";
import { withTranslation } from "react-i18next";
import __ from "./localization/tr";
import AppPage from "./pages/AppPage";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <div dir={__("dir")}>
        <AppPage />
      </div>
    </ConnectedRouter>
  );
};
App.propTypes = {
  history: PropTypes.object,
};

export default withTranslation()(App);
