import React from "react";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import { GetOneKey } from "../helpers";
import { Liquid } from "@antv/g2plot";
import { LoadingSkeleton } from "../Loading";
import { Col, Row } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { ChartTitle } from "./ChartTitle";

function mapStateToProps(state) {
  return {
    country: state.root.country,
    darkMode: state.root.user.darkMode,
  };
}

class LiquidChart extends React.Component {
  constructor(props) {
    super(props);
    this.liquidContainer = React.createRef();
    this.plot = null;
  }

  render() {
    let { country, darkMode } = this.props;
    let { currentCountryStatistics } = country;
    const Header = (
      <ChartTitle
        title={__("cure")}
        prefix={<TrophyOutlined />}
        description={__("cure desc")}
      />
    );
    if (
      currentCountryStatistics !== null &&
      currentCountryStatistics !== undefined
    ) {
      let StatisticData = currentCountryStatistics.data;
      let cases = GetOneKey(StatisticData, "cases");

      let liquidConfig = {
        percent:
          GetOneKey(cases, "recovered")[0] /
          GetOneKey(cases, "total")[0].toFixed(1),
        color: "#05C270",
        outline: {
          border: 4,
          distance: darkMode ? 0 : 4,
        },
        liquidStyle: {
          fill: "#05C270",
          stroke: "#05C270",
          lineWidth: 1,
          strokeOpacity: 1,
          shadowColor: "#05C270",
          shadowBlur: 10,
          cursor: "pointer",
        },
        wave: {
          length: 128,
        },
      };
      if (
        this.liquidContainer.current !== null &&
        this.liquidContainer.current !== undefined &&
        this.plot == null
      ) {
        const liquidPlot = new Liquid(
          this.liquidContainer.current,
          liquidConfig
        );
        this.plot = liquidPlot;
        liquidPlot.render();
      }
      if (this.plot !== null && this.plot !== undefined) {
        this.plot.update(liquidConfig);
        this.plot.render();
      }

      return (
        <Row justify={__("text-align")}>
          <Col span={24}>{Header}</Col>
          <Col span={24}>
            <div ref={this.liquidContainer} />
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

export default connect(mapStateToProps)(LiquidChart);
