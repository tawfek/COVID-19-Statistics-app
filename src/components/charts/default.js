import React from "react";
import __ from "../../localization/tr";
import { Row, Col, Badge, Statistic } from "antd";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import { TeamOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { LoadingSkeleton } from "../Loading";
import Icon from "../icon";
import Flag from "react-flags";
import TimeAgo from "react-timeago";
import { ChartTitle } from "./ChartTitle";
import { Languages } from "../../localization/languages";

function mapStateToProps(state) {
  return {
    user: state.root.user,
    data: state.root.data,
    country: state.root.country,
    page: state.root.page,
  };
}

class DefaultStatistics extends React.Component {
  render() {
    let { data, country, user } = this.props;
    let { fetchedData } = data;
    let { currentCountryData, currentCountry, currentKey } = country;
    let { isLoaded } = fetchedData;
    const pieOptions = {
      chart: {
        type: "donut",
        width: "20%",
      },
      legend: { show: false },
      labels: [__("Deaths"), __("Recovred"), __("active cases")],
      colors: ["#FF3B3B", "#05C270", "#0063F8"],
      dataLabels: { enabled: true },
    };

    const Header = (
      <ChartTitle
        title={`${__("header title")} ${__(currentCountry)} `}
        suffix={
          <Flag
            name={currentKey}
            format="png"
            pngSize={24}
            basePath=""
            style={{ borderRadius: "10px" }}
            className="flag-popover"
          />
        }
        description={this.props.page.description}
      />
    );

    if (isLoaded && currentCountryData != null) {
      let { deaths, cases, tests, time } = currentCountryData;
      let ChartData = [
        deaths.total || 0,
        cases.recovered || 0,
        cases.active || 0,
      ];
      return (
        <>
          <div className="header-info">{Header}</div>
          <Row key={0}>
            <Col span={24}>
              <p>
                <ClockCircleOutlined /> {__("last update")}{" "}
                {Languages.map((language) => {
                  if (language.key === user.language) {
                    return (
                      <TimeAgo
                        key={language.key}
                        date={Date.parse(time)}
                        formatter={language.formater}
                      />
                    );
                  }
                  return "";
                })}
              </p>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
              <Chart
                options={pieOptions}
                key={12}
                series={ChartData}
                type="donut"
              />
            </Col>
            <Col xm={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
              <Row>
                <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Statistic
                    title={__("Total Cases")}
                    value={cases.total || 0}
                    prefix={<TeamOutlined />}
                    suffix={<Badge dir="ltr" count={cases.new || 0}></Badge>}
                  />
                </Col>

                <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Statistic
                    title={__("active cases")}
                    value={cases.active || 0}
                    prefix={<Icon shape="activeCases" />}
                  />
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Statistic
                    title={__("Recovered Cases")}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    value={cases.recovered || 0}
                    prefix={<Icon shape="recovered" />}
                  />
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Statistic
                    title={__("Tests")}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    value={tests.total || 0}
                    prefix={<Icon shape="tests" />}
                  />
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Statistic
                    title={__("Critical Cases")}
                    valueStyle={{
                      color: "#cf1322",
                    }}
                    value={cases.critical || 0}
                    prefix={<Icon shape="critical" />}
                  />
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Statistic
                    title={__("Deaths")}
                    valueStyle={{
                      color: "#cf1322",
                    }}
                    suffix={<Badge dir="ltr" count={deaths.new || 0}></Badge>}
                    value={deaths.total || 0}
                    prefix={<Icon shape="deaths" />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          {Header}
          <LoadingSkeleton />;
        </>
      );
    }
  }
}

export default connect(mapStateToProps)(DefaultStatistics);
