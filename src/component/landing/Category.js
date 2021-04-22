import { CodeSandboxOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import axios from "axios";
import "../../style/_category.scss";

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  readCategoryHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/category`)
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
    this.readCategoryHandler();
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <p>Loading...</p>;
    }
    return (
      <div className='mainCategory'>
        <h1>
          Top <span style={{ color: "#fe4a55" }}>Categories</span>
        </h1>

        <div className='mainCatBox'>
          {data.map((item, index) => {
            return (
              <div
                className='singleBox'
                onClick={() =>
                  this.props.history.push(
                    `/category/${item._id}`,
                    JSON.stringify(localStorage.setItem("catId", item._id))
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
      </div>
    );
  }
}
