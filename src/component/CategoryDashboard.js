import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CategoryDashboard extends Component {
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
        console.log(JSON.stringify(data));
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
      .delete(`${process.env.REACT_APP_API_URL}/category/${id}`)
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
        title='Category'
        extra={<Link to='/create/category'>Create</Link>}
        className='card'>
        {data.map((item, index) => {
          return (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => this.deleteCategoryHandler(item._id)}
              key={index}>
              {item.name}
            </p>
          );
        })}
      </Card>
    );
  }
}
