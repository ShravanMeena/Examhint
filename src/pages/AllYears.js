import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";
import "../style/_category.scss";
import { CodeSandboxOutlined, CalendarOutlined } from "@ant-design/icons";
import Loader from "../component/Loader";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      data_stream: null,
      show_year: false,
    };
  }

  checkConditionWithPaper = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/paper/by/sub/category/${localStorage.getItem("subCat")}`
      )
      .then((data) => {
        var arrOfObj = data.data;
        var setObj = new Set();
        var result = arrOfObj.reduce((acc, item) => {
          if (item.year) {
            if (!setObj.has(item.year._id)) {
              setObj.add(item.year._id);
              acc.push(item);
            }
          }
          return acc;
        }, []);

        this.setState({
          loading: false,
          data: result,
        });
      })
      .catch((err) => {
        console.log(err, "error", err);
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.checkConditionWithPaper();
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <Loader />;
    }

    console.log(data);
    return (
      <div className='mainCategory' style={{ padding: 100 }}>
        <h1>
          <span style={{ color: "#fe4a55" }}>
            {this.props.location.subCategory || "All"}
          </span>
        </h1>
        <div className='mainCatBox'>
          {data.map((item, index) => {
            return (
              <>
                {item.year ? (
                  <div
                    key={`${index}+sds`}
                    className='singleBox'
                    onClick={() =>
                      this.props.history.push({
                        pathname: `/paper/${item.year._id}`,
                        year: item.year.year,

                        category_id: item.category,
                        sub_category_id: item.subCategory,
                        stream_id: item.stream,
                        class_id: item.classCategory,
                        year_id: item.year._id,
                      })
                    }>
                    <h5>
                      <CalendarOutlined />
                    </h5>
                    <p>{item.year.year}</p>
                  </div>
                ) : (
                  <div
                    key={`${index}+sds`}
                    className='singleBox'
                    onClick={() =>
                      this.props.history.push({
                        pathname: `/paper/${item._id}`,
                        year: item.year,
                      })
                    }>
                    <h5>
                      <CalendarOutlined />
                    </h5>
                    <p>All</p>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  }
}
