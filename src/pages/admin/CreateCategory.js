import React, { Component } from "react";
import { Button, Input, Radio } from "antd";
import axios from "axios";
import "../../style/_form.scss";
const { TextArea } = Input;

export default class CreateCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      icon: "",
      description: "",
      isFeatured: false,
      isPopular: false,
      value: 0,

      loading: false,
    };
  }

  submitHandler = () => {
    const { name, icon, description, isFeatured, isPopular } = this.state;

    var _object = {
      name,
      icon,
      description,
      isFeatured,
      isPopular,
    };
    this.setState({
      loading: true,
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/category`, _object)
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
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { name, icon, description, loading, value } = this.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    return (
      <div className='registerMain'>
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Create category </h1>
          <div className='inputFieldContainer'>
            {/* start */}
            <div className='singleField'>
              <h6>Name</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='name'
                value={name}
                placeholder=''
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
              disabled={!name || loading}
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
