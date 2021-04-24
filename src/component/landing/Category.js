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
      .get(`${process.env.REACT_APP_API_URL}/paper`)
      .then((data) => {
        var arrOfObj = data.data;
        var setObj = new Set();

        var result = arrOfObj.reduce((acc, item) => {
          if (!setObj.has(item.category._id)) {
            setObj.add(item.category._id);
            acc.push(item);
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
              <>
                {item.category && (
                  <div
                    key={index}
                    className='singleBox'
                    onClick={() =>
                      this.props.history.push(
                        {
                          pathname: `/category/${item.category._id}`,
                          category: item.name,
                        },
                        JSON.stringify(
                          localStorage.setItem("catId", item.category._id)
                        )
                      )
                    }>
                    <h5>
                      <CodeSandboxOutlined />
                    </h5>
                    <p>{item.category.name}</p>
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
