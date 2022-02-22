import React from "react";
import Map from "../components/map/map";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { HeartFilled } from "@ant-design/icons";
import { Row, Col } from "antd";
import Layout from "../layout";
import __ from "../localization/tr";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

function mapStateToProps(state) {
  return { user: state.user, country: state.country, page: state.page };
}

class AppPage extends React.Component {
  render() {
    if (this.props.user.darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    return (
      <div>
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
                    <Layout />
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
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppPage);
