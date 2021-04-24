import React, { Component } from "react";
import axios from "axios";
import "../style/_category.scss";
import { ContainerOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";
import Loader from "../component/Loader";

export default class StreamCategory extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      data_stream: null,
      show_year: false,
    };
  }

  checkConditionWithPaper = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/paper/by/sub/category/${this.props.match.params.id}`
      )
      .then((data) => {
        var arrOfObj = data.data;
        var setObj = new Set();

        var result = arrOfObj.reduce((acc, item) => {
          if (item.stream) {
            if (!setObj.has(item.stream._id)) {
              setObj.add(item.stream._id);
              acc.push(item);
            }
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
  goToCollege = () => {
    return <Redirect to='/all-years' />;
  };

  render() {
    const { data } = this.state;
    if (!data) {
      return <Loader />;
    }
    if (data.length === 0) {
      return <Redirect to={"/all-years"} />;
    }
    console.log(data);

    return (
      <div className='mainCategory' style={{ padding: 100 }}>
        <h1>
          <span style={{ color: "#fe4a55" }}>
            {this.props.location.sub_category || "Stream"}
          </span>
        </h1>
        <div className='mainCatBox'>
          {data.map((item, index) => {
            return (
              <>
                {item.stream ? (
                  <div
                    className='singleBox'
                    onClick={() =>
                      this.props.history.push(
                        {
                          pathname: `/class/category/${item.stream._id}`,
                          stream_name: item.name,
                        },
                        localStorage.setItem("streamId", item.stream._id)
                      )
                    }>
                    <h5>
                      <ContainerOutlined />{" "}
                    </h5>
                    <p>{item.stream && item.stream.name}</p>
                  </div>
                ) : (
                  <>{this.goToCollege()}</>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  }
}
