import React, { Component } from "react";
import axios from "axios";
import "../style/_category.scss";
import { BookOutlined } from "@ant-design/icons";
import Loader from "../component/Loader";

export default class SubCategory extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      data_from_paper: null,
    };
  }

  checkConditionWithPaper = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/paper/by/category/${this.props.match.params.id}`
      )
      .then((data) => {
        var arrOfObj = data.data;
        var setObj = new Set();

        var result = arrOfObj.reduce((acc, item) => {
          if (!setObj.has(item.subCategory._id)) {
            setObj.add(item.subCategory._id);
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
    this.checkConditionWithPaper();
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <Loader />;
    }
    return (
      <div className='mainCategory' style={{ paddingTop: 100 }}>
        <h1>
          Top{" "}
          <span style={{ color: "#fe4a55" }}>
            {this.props.location.category || "All"}
          </span>
        </h1>

        <div className='mainCatBox'>
          {data.map((item, index) => {
            return (
              <div
                key={`${index}+subcat`}
                className='singleBox'
                onClick={() =>
                  this.props.history.push(
                    {
                      pathname: `/sub/category/${item.subCategory._id}`,
                      sub_category: item.name,
                    },
                    localStorage.setItem("subCat", item.subCategory._id)
                  )
                }>
                <h5>
                  <BookOutlined />{" "}
                </h5>
                <p>{item.subCategory.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
