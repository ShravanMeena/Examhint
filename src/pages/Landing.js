import React, { Component } from "react";
import LeftSelection from "../component/landing/LeftSelection";
import RightSelection from "../component/landing/RightSelection";
import "../style/_landing.scss";
import Category from "../component/landing/Category";
import AppDownload from "../component/landing/AppDownload";

export default class Landing extends Component {
  render() {
    return (
      <div className='mainLanding'>
        <div className='landing'>
          <LeftSelection />
          <RightSelection />
        </div>

        <Category history={this.props.history} />

        <AppDownload />
      </div>
    );
  }
}
