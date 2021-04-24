import React, { Component } from "react";
import axios from "axios";
import "../style/_category.scss";
import { CalendarOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";

export default class ClassCategory extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      show_year: false,
    };
  }

  checkConditionWithPaper = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/paper/by/stream/category/${this.props.match.params.id}`
      )
      .then((data) => {
        var arrOfObj = data.data;
        var setObj = new Set();

        var result = arrOfObj.reduce((acc, item) => {
          if (item.classCategory) {
            if (!setObj.has(item.classCategory._id)) {
              setObj.add(item.classCategory._id);
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

  goToYear = () => {
    return <Redirect to='/all-years' />;
  };

  render() {
    const { data } = this.state;
    if (!data) {
      return <p>Loading...</p>;
    }
    if (data.length === 0) {
      return <Redirect to={"/all-years"} />;
    }
    return (
      <div className='mainCategory' style={{ padding: 100 }}>
        <h1>
          <span style={{ color: "#fe4a55" }}>
            {this.props.location.stream_name || "Class"}
          </span>
        </h1>
        <div className='mainCatBox'>
          {data.map((item, index) => {
            return (
              <>
                {item.classCategory ? (
                  <div
                    className='singleBox'
                    onClick={() =>
                      this.props.history.push(
                        {
                          pathname: `/by/${item.classCategory._id}`,
                          stream_name: item.classCategory.name,
                        },
                        localStorage.setItem("classId", item.classCategory._id)
                      )
                    }>
                    <h5>
                      <CalendarOutlined />
                    </h5>
                    <p>{item.classCategory.name}</p>
                  </div>
                ) : (
                  <>{this.goToYear()}</>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  }
}
