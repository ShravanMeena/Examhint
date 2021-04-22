import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";

export default class StreamCategory extends Component {
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

        console.log(data);
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
      <div style={{ padding: 50 }}>
        <h1 style={{ fontSize: 40 }}>Stream Main Category</h1>

        {!(data.length === 0 || data[0].subCategory === null) ? (
          <>
            {data.map((item, index) => {
              return (
                <Card style={{ marginTop: 20, backgroundColor: "#f2f5ff" }}>
                  <p
                    onClick={() =>
                      this.props.history.push(
                        `/sub/category/${item._id}`,
                        localStorage.setItem("subCat", item._id)
                      )
                    }
                    style={{ cursor: "pointer" }}
                    key={index}>
                    {item.name}
                  </p>
                </Card>
              );
            })}
          </>
        ) : (
          <Card style={{ marginTop: 20, backgroundColor: "#f2f5ff" }}>
            <p
              onClick={() =>
                this.props.history.push(
                  `/all-years/${this.props.match.params.id}`
                )
              }
              style={{ cursor: "pointer" }}>
              All
            </p>
          </Card>
        )}
      </div>
    );
  }
}
