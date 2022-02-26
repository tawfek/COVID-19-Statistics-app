import React from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import DefaultLayout from "../components/layout";
import CountriesTab from "../components/CountriesTab";

class Home extends React.Component {
  render() {
    return (
      <Row>
        <Col dir="ltr" sm={24} md={24}>
          <CountriesTab history={this.props.history} />;
          <DefaultLayout />
        </Col>
      </Row>
    );
  }
}

export default withRouter(Home);
