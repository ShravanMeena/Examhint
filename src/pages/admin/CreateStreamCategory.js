import React, { Component } from "react";
import { Button, Input, Select } from "antd";
import axios from "axios";
import "../../style/_form.scss";
const { Option } = Select;
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
      subCategory: null,

      loading: false,
    };
  }

  submitHandler = () => {
    const {
      name,
      icon,
      description,
      isFeatured,
      isPopular,
      subCategory,
    } = this.state;

    var _object = {
      name,
      icon,
      description,
      isFeatured,
      isPopular,
      subCategory,
    };

    this.setState({
      loading: true,
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/stream`, _object)
      .then((data) => {
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

  readSubCategoryHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sub/category`)
      .then((data) => {
        this.setState({
          loading: false,
          data_sub_categories: data.data,
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
    this.readSubCategoryHandler();
  }

  handleSelectChange = (value) => {
    this.setState({
      subCategory: value,
    });
  };

  render() {
    const {
      name,
      icon,
      description,
      loading,
      data_sub_categories,
    } = this.state;

    return (
      <div className='registerMain'>
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Create stream </h1>
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

            <div className='singleField'>
              <Select
                size='large'
                defaultValue='yr'
                style={{ width: "100%", backgroundColor: "#f2f5fa" }}
                onChange={this.handleSelectChange}>
                <Option value='yr'>Select sub category</Option>
                {data_sub_categories &&
                  data_sub_categories.map((item, index) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>

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
