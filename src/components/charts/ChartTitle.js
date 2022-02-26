import React from "react";
import { Row, Typography, Col } from "antd";
import __ from "../../localization/tr";

const { Title } = Typography;

export function ChartTitle({ title, suffix, prefix, description }) {
  return (
    <div dir={__("dir")}>
      <Row>
        <Col span={24}>
          <Title level={1}>
            <Row gutter={[4]} wrap="false">
              {prefix && <Col>{prefix}</Col>}

              <Col>{title}</Col>

              {suffix && <Col>{suffix}</Col>}
            </Row>
          </Title>
        </Col>
        <Col span={24}>
          <p>{description}</p>
        </Col>
      </Row>
    </div>
  );
}
