import React from "react";
import "./styles/App.css";
import { withTranslation } from "react-i18next";
import tr from "./localization/tr";
import AppPage from "./pages/AppPage";

const App = ({ t }) => (
  <div dir={tr("dir")}>
    <AppPage />
  </div>
);

export default withTranslation()(App);
