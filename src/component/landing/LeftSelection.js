import React, { Component } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

export default class LeftSelection extends Component {
  render() {
    return (
      <div className='left'>
        <h1>
          Crack Your Exam With{" "}
          <span style={{ color: "#fe4a55" }}>Examhint</span> Any Time, Anywhere
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className='inputContainer'>
          <div className='icon'>
            <SearchOutlined size='large' />
          </div>
          <Input placeholder='What do you want to learn?' />
          <Button
            size='large'
            style={{ background: "#fe4a55", color: "#fff", fontWeight: 500 }}>
            Search
          </Button>
        </div>
      </div>
    );
  }
}
