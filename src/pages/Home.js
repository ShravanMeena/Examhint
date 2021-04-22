import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";

export default class Home extends Component {
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
      <div style={{ padding: 50 }}>
        <h1 style={{ fontSize: 40 }}>Find your paper</h1>
        {data.map((item, index) => {
          return (
            <Card style={{ marginTop: 20, backgroundColor: "#f2f5ff" }}>
              <p
                onClick={() =>
                  this.props.history.push(
                    `/category/${item._id}`,
                    JSON.stringify(localStorage.setItem("catId", item._id))
                  )
                }
                style={{ cursor: "pointer" }}
                key={`${index}basbabd`}>
                {item.name}
              </p>
            </Card>
          );
        })}
      </div>
    );
  }
}
