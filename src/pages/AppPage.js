import React from "react";
import Map from "../components/map/map";
import {
  BrowserRouter as Router,
  Switch,
  withRouter,
  matchPath,
} from "react-router-dom";
import { HeartFilled } from "@ant-design/icons";
import { Row, Col } from "antd";
import Home from "./home";
import __ from "../localization/tr";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { setLanguage } from "../store/actions";
import { history } from "../store";
import { ConnectedRouter } from "connected-react-router";
import { setCountry } from "../components/helpers";
import { changeLanguage } from "../components/helpers";
function mapStateToProps(state) {
  return {
    user: state.root.user,
    country: state.root.country,
    page: state.root.page,
    location: state.router.location,
    pathname: state.router.location.pathname,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setLanguage: (language) => dispatch(setLanguage(language)),
  };
}

class AppPage extends React.Component {
  componentDidMount() {
    let params = matchPath(this.props.pathname, {
      path: "/:lng/:country",
    });
    if (params !== null) {
      params = params.params;
      if (this.props.country.currentCountry !== params.country) {
        setCountry(params.country);
      }
      if (
        params.lng !== this.props.user.language &&
        params.lng !== null &&
        params.lng !== undefined
      ) {
        changeLanguage(params.lng);
      }
    }
  }

  render() {
    if (this.props.user.darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    return (
      <ConnectedRouter history={history}>
        <Helmet>
          <title>{this.props.page.title}</title>
          <meta name="description" content={this.props.page.description} />
          <meta property="og:title" content={this.props.page.title} />
          <meta
            property="og:description"
            content={this.props.page.description}
          />
          <meta property="twitter:title" content={this.props.page.title} />
          <meta
            property="twitter:description"
            content={this.props.page.title}
          />
        </Helmet>
        <Row justify="center">
          <Col className="Map" style={{ overflow: "hidden" }} span={24}>
            <Map />
          </Col>

          <Col
            className="content"
            justify="center"
            align="middle"
            xs={24}
            xm={24}
            md={{ span: 24 }}
            lg={{ span: 22, offset: 1 }}
            xl={{ span: 20, offset: 2 }}
          >
            <Row justify="center" align="middle">
              <Col md={24} sm={24} className="content-1">
                <Router>
                  <Switch>
                    <Home />
                  </Switch>{" "}
                </Router>
              </Col>
            </Row>
          </Col>
          <Col
            justify="center"
            align="middle"
            xs={24}
            xm={24}
            md={{ span: 24 }}
            lg={{ span: 22, offset: 1 }}
            xl={{ span: 20, offset: 2 }}
          >
            <Row justify="center" align="middle">
              <Col md={24} sm={24} className="copyright">
                {__("made with")} <HeartFilled style={{ color: "#FF3B3B" }} />{" "}
                {__("by")}{" "}
                <a
                  target="_blank"
                  title="@tawfekmt"
                  href="https://instagram.com/tawfekmt"
                  rel="nofollow noindex noopener noreferrer"
                  dir="ltr"
                >
                  @tawfekmt
                </a>
              </Col>
              <br />
              <br />
            </Row>
          </Col>
        </Row>
      </ConnectedRouter>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppPage)
);
