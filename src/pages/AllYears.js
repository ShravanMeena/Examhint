import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";
import { CalendarOutlined } from "@ant-design/icons";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      data_year: null,
    };
  }
  readYearHandler = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/paper/by/category/${this.props.match.params.id}`
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

  readYearHandlerFromYear = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/year`)
      .then((data) => {
        this.setState({
          loading: false,
          data_year: data.data,
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
    this.readYearHandler();
    this.readYearHandlerFromYear();
  }

  render() {
    const { data, data_year } = this.state;
    if (!data || !data_year) {
      return <p>Loading...</p>;
    }
    return (
      <div className='mainCategory' style={{ padding: 100 }}>
        <h1 style={{ fontSize: 40 }}>Years</h1>

        <div className='mainCatBox'>
          {data_year.map((item, index) => {
            return (
              <div
                className='singleBox'
                onClick={() => this.props.history.push(`/by/${item._id}`)}>
                <h5>
                  <CalendarOutlined />
                </h5>
                <p>{item.year}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
