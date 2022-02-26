import React from "react";
import __ from "../localization/tr";
import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { Typography } from "antd";
const { Title } = Typography;

export function LoadingSkeleton({ title, icon, description }) {
  return (
    <>
      <span style={{ textAlign: __("text-align") }}>
        <Title level={2}>
          {icon} {title}
        </Title>
        <p>{description}</p>
      </span>

      <div key={2} dir={__("dir")}>
        <LoadingOutlined key={0} /> {__("data loading")}{" "}
        <Skeleton key={1} active />
      </div>
    </>
  );
}
