import React from "react";
import DefaultStatistics from "../components/charts/default";
import LineChart from "../components/charts/lineChart";
import PercentChart from "../components/charts/percentChart";
import DaysCollapseChart from "../components/charts/daysCollapseChart";
import LiquidChart from "../components/charts/liquidChart";
import { Row, Col } from "antd";
import __ from "../localization/tr";

class DefaultLayout extends React.Component {
  render() {
    return (
      <Row>
        <Col dir={__("dir")} span={24} className="bshadow header">
          <DefaultStatistics />
        </Col>
        <Col
          className="bshadow"
          style={{
            background: "rgba(0,0,0,0)",
            paddingLeft: 0,
          }}
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={16}
          xxl={16}
        >
          <Row>
            <Col span={24} className="bshadow">
              <LineChart />
            </Col>

            <Col span={24} style={{ marginTop: 10 }} className="bshadow">
              <PercentChart />
            </Col>
          </Row>
        </Col>

        <Col
          style={{ marginTop: 10 }}
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          xxl={8}
        >
          <Row>
            <Col span={24} className="bshadow">
              <DaysCollapseChart />
            </Col>
            <Col span={24} style={{ marginTop: 10 }} className="bshadow">
              <LiquidChart />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default DefaultLayout;
