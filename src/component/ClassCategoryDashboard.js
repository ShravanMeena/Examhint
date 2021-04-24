import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ClassCategoryDashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  readCategoryHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/class/category`)
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
  deleteCategoryHandler = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/class/category/${id}`)
      .then((data) => {
        this.readCategoryHandler();
      })
      .catch((err) => {
        console.log(err, "error", err);
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    const { data } = this.state;
    if (!data) {
      return <p>Loading...</p>;
    }
    return (
      <Card
        title='Class Category'
        extra={<Link to='/create/class/category'>Create</Link>}
        className='card'>
        {data.map((item, index) => {
          return (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => this.deleteCategoryHandler(item._id)}
              key={index}>
              {item.name} -{" "}
              {item.stream && (
                <span style={{ color: "gray" }}>{item.stream.name}</span>
              )}
            </p>
          );
        })}
      </Card>
    );
  }
}
