import React, { Component } from "react";
import "../../style/_dashboard.scss";
import CategoryDashboard from "../../component/CategoryDashboard";
import SubCategoryDashboard from "../../component/SubCategoryDashboard";
import PaperDashboard from "../../component/PaperDashboard";
import YearDashboard from "../../component/YearDashboard";
import StreamDashboard from "../../component/StreamDashboard";
import ClassCategoryDashboard from "../../component/ClassCategoryDashboard";

export default class dashboard extends Component {
  render() {
    return (
      <>
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            padding: 40,
            fontSize: 40,
            paddingTop: "14vh",
          }}>
          Dashboard
        </h1>
        <div className='main'>
          <CategoryDashboard />
          <SubCategoryDashboard />
          <StreamDashboard />
          <ClassCategoryDashboard />
          <YearDashboard />
          <PaperDashboard />
        </div>
      </>
    );
  }
}
