import React, { Component } from "react";
import {
  AndroidOutlined,
  AppleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";

export default class LeftSelection extends Component {
  render() {
    return (
      <div className='left'>
        <label>EXAMHINT MOBILE APP</label>
        <h1>Access From Your Mobile, Learn Any Time Any Where</h1>
        <p>
          eCademy training programs can bring you a super exciting experience of
          learning through online! You never face any negative experience while
          enjoying your classes virtually by sitting in your comfort zone. Our
          flexible learning initiatives will help you to learn better and
          quicker than the traditional ways of learning skills.
        </p>

        <div className='inputContainer'>
          <Button
            size='large'
            style={{
              background: "#221638",
              color: "#fff",
              fontWeight: 500,
              width: 180,
              padding: 10,
            }}>
            <AndroidOutlined /> Google Play
          </Button>

          <Button
            size='large'
            style={{
              background: "#221638",
              color: "#fff",
              fontWeight: 500,
              marginLeft: 20,
              width: 180,
              padding: 10,
            }}>
            <AppleOutlined /> App Store
          </Button>
        </div>
      </div>
    );
  }
}
