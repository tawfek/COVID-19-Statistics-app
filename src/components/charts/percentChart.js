import React from "react";
import Chart from "react-apexcharts";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import { GetOneKey } from "../helpers";
import { LoadingSkeleton } from "../Loading";
import { Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
const { Title } = Typography;

function mapStateToProps(state) {
  return {
    user: state.user,
    country: state.country,
    page: state.page,
    data: state.data,
  };
}

class PercentChart extends React.Component {
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
      const options = {
        chart: {
          type: "bar",
          id: "basic-bar",
          height: 350,
          stacked: true,
          stackType: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"],
        },
        fill: {
          opacity: 1,
        },
        xaxis: {
          categories: GetOneKey(StatisticData, "day"),
        },
        colors: ["#FF3B3B", "#05C270", "#0063F8", "#F06735"],
      };
      const series = [
        {
          name: __("Deaths"),
          data: GetOneKey(deaths, "total"),
        },
        {
          name: __("Recovred"),
          data: GetOneKey(cases, "recovered"),
        },

        {
          name: __("active cases"),
          data: GetOneKey(cases, "active"),
        },
        {
          name: __("Critical cases"),
          data: GetOneKey(cases, "critical"),
        },
      ];

      return (
        <>
          <span style={{ textAlign: __("text-align") }}>
            <Title level={2}>
              <PercentageOutlined /> {__("percent-title")}
            </Title>
            <p>{__("percent-info")}</p>
          </span>
          <Chart
            key={2}
            options={options}
            series={series}
            type="bar"
            height={300}
          />
        </>
      );
    } else {
      return <LoadingSkeleton />;
    }
  }
}

export default connect(mapStateToProps)(PercentChart);
