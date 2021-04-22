import {
  AndroidOutlined,
  AppleOutlined,
  CodeSandboxOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import "../../style/_category.scss";

const data = [
  { icon: <AndroidOutlined />, name: "SSC" },
  { icon: <AppleOutlined />, name: "UPSC" },
  { icon: <GithubOutlined />, name: "COLLEGE" },
  { icon: <GithubOutlined />, name: "COLLEGE" },
  { icon: <GithubOutlined />, name: "COLLEGE" },
  { icon: <GithubOutlined />, name: "COLLEGE" },
  { icon: <TwitterOutlined />, name: "SCHOOL" },
  { icon: <CodeSandboxOutlined />, name: "CGL" },
  { icon: <InstagramOutlined />, name: "OTHER" },
];

export default class Category extends Component {
  render() {
    return (
      <div className='mainCategory'>
        <h1>
          Top <span style={{ color: "#fe4a55" }}>Categories</span>
        </h1>

        <div className='mainCatBox'>
          {data.map((item, index) => {
            return (
              <div className='singleBox'>
                <h5>{item.icon}</h5>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
