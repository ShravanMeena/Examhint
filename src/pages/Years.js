import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";
import "../style/_category.scss";
import { CodeSandboxOutlined, CalendarOutlined } from "@ant-design/icons";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      data_stream: null,
      show_year: false,
    };
  }

  readSubCategoryHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/year`)
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

  readStreamHandler = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/stream/${this.props.match.params.id}`
      )
      .then((data) => {
        this.setState({
          loading: false,
          data_stream: data.data,
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
    this.readStreamHandler();
  }

  render() {
    const { data, data_stream, show_year } = this.state;
    if (!data || !data_stream) {
      return <p>Loading...</p>;
    }
    return (
      <div className='mainCategory' style={{ padding: 100 }}>
        <h1 style={{ fontSize: 40 }}>
          {data_stream.length > 0 && !show_year ? "Stream" : "Years"}
        </h1>

        {data_stream.length > 0 && !show_year ? (
          <div className='mainCatBox'>
            {data_stream.map((s_item, index) => {
              return (
                <div
                  className='singleBox'
                  onClick={() => this.setState({ show_year: true })}>
                  <h5>
                    <CodeSandboxOutlined />
                  </h5>
                  <p>{s_item.name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='mainCatBox'>
            {data.map((item, index) => {
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
        )}
      </div>
    );
  }
}
