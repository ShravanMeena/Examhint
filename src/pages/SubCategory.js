import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";
import "../style/_category.scss";
import { CodeSandboxOutlined } from "@ant-design/icons";

export default class SubCategory extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  readSubCategoryHandler = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/sub/category/${this.props.match.params.id}`
      )
      .then((data) => {
        this.setState({
          loading: false,
          data: data.data,
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
    this.readSubCategoryHandler();
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <p>Loading...</p>;
    }

    return (
      <div className='mainCategory' style={{ paddingTop: 100 }}>
        <h1>
          Top <span style={{ color: "#fe4a55" }}>Sub Categories</span>
        </h1>

        {!(data.length === 0 || data[0].subCategory === null) ? (
          <div className='mainCatBox'>
            {data.map((item, index) => {
              return (
                <div
                  className='singleBox'
                  onClick={() =>
                    this.props.history.push(
                      `/sub/category/${item._id}`,
                      localStorage.setItem("subCat", item._id)
                    )
                  }>
                  <h5>
                    <CodeSandboxOutlined />
                  </h5>
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='mainCatBox'>
            <div
              className='singleBox'
              onClick={() =>
                this.props.history.push(
                  `/all-years/${this.props.match.params.id}`
                )
              }>
              <p>All</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
