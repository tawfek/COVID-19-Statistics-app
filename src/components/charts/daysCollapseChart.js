import React from "react";
import Chart from "react-apexcharts";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import { GetOneKey } from "../helpers";
import { Row, Col, Collapse, Badge, Statistic, Typography } from "antd";
import {
  TeamOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { LoadingSkeleton } from "../Loading";
import Icon from "../icon"
const { Panel } = Collapse;
const { Title } = Typography;

function mapStateToProps(state) {
  return {
    user: state.root.user,
    country: state.root.country,
    page: state.root.page,
    data: state.root.data,
  };
}

class DaysCollapseChart extends React.Component {
  render() {
    let { country } = this.props;
    let { currentCountryStatistics } = country;
    if (
      currentCountryStatistics !== null &&
      currentCountryStatistics !== undefined
    ) {
      let StatisticData = currentCountryStatistics.data;
      let cases = GetOneKey(StatisticData, "cases");
      let deaths = GetOneKey(StatisticData, "deaths");
      let tests = GetOneKey(StatisticData, "tests");

      let Days = GetOneKey(StatisticData, "day").map((day, key) => {
        const options = {
          chart: {
            type: "donut",
            width: "100%",
          },
          title: {
            text: GetOneKey(StatisticData, "day")[key],
          },
          legend: {
            show: false,
          },
          labels: [
            __("Deaths"),
            __("Recovred"),
            __("active cases"),
            __("Critical cases"),
          ],
          colors: ["#FF3B3B", "#05C270", "#0063F8", "#F06735"],
          dataLabels: {
            enabled: false,
          },
        };
        const series = [
          GetOneKey(deaths, "total")[key],
          GetOneKey(cases, "recovered")[key],
          GetOneKey(cases, "active")[key],
          GetOneKey(cases, "critical")[key],
        ];

        return (
          <Panel
            className="collapse-custom-panel"
            header={
              <span>
                <ClockCircleOutlined /> {GetOneKey(StatisticData, "day")[key]}{" "}
                <Badge dir="ltr" count={GetOneKey(cases, "new")[0]}></Badge>
              </span>
            }
            key={key}
          >
            <Row>
              <Col xs={12} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Statistic
                  title={__("Total Cases")}
                  value={GetOneKey(cases, "total")[key]}
                  prefix={<TeamOutlined />}
                  suffix={
                    <Badge
                      dir="ltr"
                      count={GetOneKey(cases, "new")[key]}
                    ></Badge>
                  }
                />
              </Col>

              <Col xs={12} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Statistic
                  title={__("active cases")}
                  value={GetOneKey(cases, "active")[key]}
                  prefix={
                 <Icon shape="activeCases"/>
                  }
                />
              </Col>
              <Col xs={12} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Statistic
                  title={__("Recovered Cases")}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                  value={GetOneKey(cases, "recovered")[key]}
                  prefix={ <Icon shape="recovered"/>}
                />
              </Col>
              <Col xs={12} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Statistic
                  title={__("Tests")}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                  value={GetOneKey(tests, "total")[key]}
                  prefix={ <Icon shape="tests"/>}
                />
              </Col>
              <Col xs={12} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Statistic
                  title={__("Critical Cases")}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                  value={GetOneKey(cases, "critical")[key]}
                  prefix={ <Icon shape="critical"/> }
                />
              </Col>
              <Col xs={12} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Statistic
                  title={__("Deaths")}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                  suffix={
                    <Badge
                      dir="ltr"
                      count={GetOneKey(deaths, "new")[key]}
                    ></Badge>
                  }
                  value={GetOneKey(deaths, "total")[key]}
                  prefix={<Icon shape="deaths"/>}
                />
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Chart
                  options={options}
                  series={series}
                  key={key}
                  type="donut"
                />
              </Col>
            </Row>
          </Panel>
        );
      });
      return (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <span style={{ textAlign: __("text-align") }}>
              <Title level={2}>
                <HistoryOutlined /> {__("history-title")}
              </Title>
              <p>{__("history-info")}</p>
            </span>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Collapse
              accordion
              bordered={false}
              className="collapse-custom-collapse"
            >
              {Days}
            </Collapse>
          </Col>
        </Row>
      );
    } else {
      return <LoadingSkeleton />;
    }
  }
}

export default connect(mapStateToProps)(DaysCollapseChart);
