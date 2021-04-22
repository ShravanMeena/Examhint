import React, { Component } from "react";
import { Button, Input, Radio, DatePicker } from "antd";
import axios from "axios";
import "../../style/_form.scss";
const { TextArea } = Input;

export default class CreateYear extends Component {
  constructor() {
    super();
    this.state = {
      year: "",
      icon: "",
      description: "",
      isFeatured: false,
      isPopular: false,
      value: 0,

      loading: false,
    };
  }

  submitHandler = () => {
    const { year, icon, description, isFeatured, isPopular } = this.state;

    var _object = {
      year,
      icon,
      description,
      isFeatured,
      isPopular,
    };
    this.setState({
      loading: true,
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/year`, _object)
      .then((data) => {
        console.log(JSON.stringify(data));
        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err, "error", err);
        this.setState({
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { year, icon, description, loading, value } = this.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    return (
      <div className='registerMain'>
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Add new year</h1>
          <div className='inputFieldContainer'>
            {/* start */}
            <div className='singleField'>
              <h6>Year</h6>
              <DatePicker
                style={{
                  width: "100%",
                  backgroundColor: "#f2f5ff",
                  borderColor: "#f2f5ff",
                }}
                onChange={(date, dateString) =>
                  this.setState({ year: dateString })
                }
                picker='year'
              />
            </div>

            <div className='singleField'>
              <h6>Icon name</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='icon'
                value={icon}
                placeholder=''
              />
            </div>

            {/* start */}
            <div className='singleField'>
              <h6>Description</h6>
              <TextArea
                rows={4}
                onChange={(event) => this.handleChange(event)}
                name='description'
                value={description}
                placeholder=''
              />
            </div>

            <Radio.Group onChange={this.onChange} value={value}>
              <Radio style={radioStyle} value={1}>
                Featured
              </Radio>
              <Radio style={radioStyle} value={2}>
                Popular
              </Radio>
            </Radio.Group>

            <Button
              disabled={!year || loading}
              size='large'
              onClick={this.submitHandler}
              style={{ marginTop: 10 }}>
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
