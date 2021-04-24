import React, { Component } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default class Loader extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>
        <Spin
          tip='Loading...'
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}></Spin>
      </div>
    );
  }
}
