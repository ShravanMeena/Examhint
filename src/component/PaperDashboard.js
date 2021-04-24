import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

export default class PaperDashboard extends Component {
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
      .delete(`${process.env.REACT_APP_API_URL}/paper/${id}`)
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
        title='Paper'
        extra={<Link to='/create/paper'>Create</Link>}
        className='card'>
        {data.map((item, index) => {
          return (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => this.deleteCategoryHandler(item._id)}
              key={index}>
              {item.title} -{" "}
              {item.category && (
                <span style={{ color: "gray" }}>{item.category.name}</span>
              )}{" "}
              -{" "}
              {item.subCategory && (
                <span style={{ color: "gray" }}>{item.subCategory.name}</span>
              )}{" "}
              -{" "}
              {item.stream && (
                <span style={{ color: "gray" }}>{item.stream.name}</span>
              )}{" "}
              -
              {item.classCategory && (
                <span style={{ color: "gray" }}>{item.classCategory.name}</span>
              )}{" "}
              -
              {item.year && (
                <span style={{ color: "gray" }}>{item.year.year}</span>
              )}
            </p>
          );
        })}
      </Card>
    );
  }
}
