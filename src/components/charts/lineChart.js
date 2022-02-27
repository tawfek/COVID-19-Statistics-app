import React from "react";
import Chart from "react-apexcharts";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import { GetOneKey } from "../helpers";
import { LoadingSkeleton } from "../Loading";
import { AreaChartOutlined } from "@ant-design/icons";
import { ChartTitle } from "./ChartTitle";
import { Row, Col } from "antd";

function mapStateToProps(state) {
  return {
    country: state.root.country,
    data: state.root.data,
  };
}

class LineChart extends React.Component {
  render() {
    let { country } = this.props;
    let { currentCountryStatistics } = country;
    const Header = (
      <ChartTitle
        title={__("chart-title")}
        prefix={<AreaChartOutlined />}
        description={__("chart-info")}
      />
    );
    if (
      currentCountryStatistics !== null &&
      currentCountryStatistics !== undefined
    ) {
      let StatisticData = currentCountryStatistics.data;
      let cases = GetOneKey(StatisticData, "cases");
      let deaths = GetOneKey(StatisticData, "deaths");
      const options = {
        chart: {
          id: "basic-bar",
          type: "line",
        },
        xaxis: {
          categories: GetOneKey(StatisticData, "day"),
          type: "category",
          tickAmount: 5,
          tickPlacement: "on",
          labels: {
            format: "YYYY-MM-dd",
          },
        },
        colors: ["#FF3B3B", "#05C270", "#0063F8", "#F06735"],
        dataLabels: {
          enabled: false,
        },
        zoom: {
          autoScaleYaxis: true,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
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
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            {Header}
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Chart
              key={2}
              options={options}
              series={series}
              type="area"
              height={300}
            />
          </Col>
        </Row>
      );
    } else {
      return (
        <>
          {Header}
          <LoadingSkeleton />
        </>
      );
    }
  }
}

export default connect(mapStateToProps)(LineChart);
