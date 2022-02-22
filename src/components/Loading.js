import React from "react";
import __ from "../localization/tr";
import {LoadingOutlined} from "@ant-design/icons";
import {Skeleton} from "antd"

export function LoadingSkeleton () {
    return (
    <div key={2} dir={__("dir")}>
    <LoadingOutlined key={0} /> {__("data loading")}{" "}
    <Skeleton  key={1} active />
  </div>
    )
}