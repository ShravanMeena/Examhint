import React, { Component } from "react";
import LeftSelection from "./LeftAppSection";
import RightSelection from "./RightAppSection";

import "../../style/_appDownload.scss";

export default class AppDownload extends Component {
  render() {
    return (
      <div className='mainAppLand'>
        <div className='appSection'>
          <RightSelection />
          <LeftSelection />
        </div>
      </div>
    );
  }
}
