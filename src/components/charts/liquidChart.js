import React from "react";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import { GetOneKey } from "../helpers";
import { Liquid } from "@antv/g2plot";

import ReactG2Plot from "react-g2plot";
import { LoadingSkeleton } from "../Loading";
import { Typography } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
const { Title } = Typography;

function mapStateToProps(state) {
  return {
    country: state.root.country,
  };
}

class LiquidChart extends React.Component {
  render() {
    let { country } = this.props;
    let { currentCountryStatistics } = country;
    if (
      currentCountryStatistics !== null &&
      currentCountryStatistics !== undefined
    ) {
      let StatisticData = currentCountryStatistics.data;
      let cases = GetOneKey(StatisticData, "cases");

      const liquidconfig = {
        color: "#05C270",
        min: 0,
        max: GetOneKey(cases, "total")[0],
        value: GetOneKey(cases, "recovered")[0],
        statistic: {
          formatter: (value) =>
            ((100 * value) / GetOneKey(cases, "total")[0]).toFixed(1) + "%",
        },
      };
      return (
        <>
          <span style={{ textAlign: __("text-align") }}>
            <Title level={2}>
              {" "}
              <TrophyOutlined /> {__("cure")}
            </Title>
            <p>{__("cure desc")}</p>
          </span>
          <ReactG2Plot
            key={1}
            dir={__("dir")}
            className="g2plot-for-react"
            Ctor={Liquid}
            config={liquidconfig}
          />
        </>
      );
    } else {
      return <LoadingSkeleton />;
    }
  }
}

export default connect(mapStateToProps)(LiquidChart);
