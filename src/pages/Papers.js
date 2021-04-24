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
    const {
      category_id,
      class_id,
      stream_id,
      sub_category_id,
      year_id,
    } = this.props.location;
    const _object = {
      year: year_id,
      category: category_id,
      subCategory: sub_category_id,
      classCategory: class_id,
      stream: stream_id,
    };

    console.log(_object);

    if (
      this.props.match.params.year ||
      localStorage.getItem("subCat") ||
      localStorage.getItem("catId")
    ) {
      const _obj_new = {
        year: this.props.match.params.year,
        category: localStorage.getItem("catId"),
        subCategory: localStorage.getItem("subCat"),
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/paper/with/cat-and-sub`,
          _obj_new
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
    }

    if (year_id || category_id || sub_category_id || stream_id || class_id) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/paper/all/with-cat-sub-cat-everything`,
          _object
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
    }
  };

  componentDidMount() {
    this.readYearHandler();
  }

  render() {
    console.log(this.props.location);
    const { data } = this.state;
    if (!data) {
      return <p>Loading...</p>;
    }
    return (
      <div className='mainCategory' style={{ padding: 100 }}>
        <h1>
          <span style={{ color: "#fe4a55" }}>
            {this.props.location.year || "All"}
          </span>
        </h1>
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
