import { BgColorsOutlined, LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../style/_header.scss";

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='left'>
          <h1>
            <Link to='/'>
              <BgColorsOutlined />
              <span>Exam</span>hint
            </Link>
          </h1>
        </div>
        <div className='right'>
          <Link to='/dashboard'>
            <Button
              size='large'
              style={{
                background: "#fe4a55",
                color: "#fff",
                fontWeight: 500,
                borderColor: "#fe4a55",
              }}>
              <LoginOutlined />
              Login/Register
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
