import React, { Component } from "react";
import axios from "axios";
import { PaperClipOutlined } from "@ant-design/icons";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  readYearHandler = () => {
    const _object = {
      year: this.props.match.params.year,
      category: localStorage.getItem("catId"),
      subCategory: localStorage.getItem("subCat"),
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/paper/by/year/or/category`,
        _object
      )
      .then((data) => {
        this.setState({
          loading: false,
          data: data.data,
        });
        console.log(data.data);
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
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <p>Loading...</p>;
    }
    return (
      <div className='mainCategory' style={{ padding: 100 }}>
        <h1 style={{ fontSize: 40 }}>Papers</h1>

        <div className='mainCatBox'>
          {data.map((item, index) => {
            return (
              <div
                className='singleBox'
                onClick={() => this.setState({ show_year: true })}>
                <h5>
                  <PaperClipOutlined />
                </h5>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
