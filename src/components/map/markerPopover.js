import React from "react";
import { Row, Col, Statistic, Badge } from "antd";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import { TeamOutlined } from "@ant-design/icons";
import { LoadingSkeleton } from "../Loading";
import Icon from "../icon";

function mapStateToProps(state) {
  return {
    user: state.root.user,
    country: state.root.country,
    MapConfig: state.root.MapConfig,
    data: state.root.data,
  };
}

class MarkerPopover extends React.Component {
  render() {
    const { data, country } = this.props;
    const { currentCountryData } = country;
    let { fetchedData } = data;
    let { isLoaded } = fetchedData;
    if (isLoaded && currentCountryData !== null) {
      let { deaths, cases, tests } = currentCountryData;
      return (
        <Row className="country-popover">
          <Col sm={24} md={12}>
            <Statistic
              title={__("Total Cases")}
              value={cases.total}
              prefix={<TeamOutlined />}
              suffix={<Badge count={cases.new + " " + __("New")}></Badge>}
            />
          </Col>

          <Col sm={24} md={12}>
            <Statistic
              title={__("active cases")}
              value={cases.active}
              prefix={<Icon shape="activeCases"/>}
            />
          </Col>
          <Col sm={24} md={12}>
            <Statistic
              title={__("Recovered Cases")}
              valueStyle={{ color: "#3f8600" }}
              value={cases.recovered}
              prefix={<Icon shape="recovered"/>}
            />
          </Col>
          <Col sm={24} md={12}>
            <Statistic
              title={__("Tests")}
              valueStyle={{ color: "#3f8600" }}
              value={tests.total || 0}
              prefix={<Icon shape="tests"/>}
            />
          </Col>
          <Col sm={24} md={12}>
            <Statistic
              title={__("Critical Cases")}
              valueStyle={{ color: "#cf1322" }}
              value={cases.critical || 0}
              prefix={<Icon shape="critical"/>}
            />
          </Col>
          <Col sm={24} md={12}>
            <Statistic
              title={__("Deaths")}
              valueStyle={{ color: "#cf1322" }}
              suffix={
                <Badge count={(deaths.new || 0) + " " + __("New")}></Badge>
              }
              value={deaths.total || 0}
              prefix={<Icon shape="deaths"/> }
            />
          </Col>
        </Row>
      );
    } else {
      return <LoadingSkeleton />;
    }
  }
}

export default connect(mapStateToProps)(MarkerPopover);
