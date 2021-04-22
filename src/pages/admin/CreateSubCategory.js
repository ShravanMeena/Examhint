import React, { Component } from "react";
import { Button, Input, Select } from "antd";
import axios from "axios";
import "../../style/_form.scss";
const { TextArea } = Input;
const { Option } = Select;

export default class CreateSubCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      icon: "",
      description: "",
      isFeatured: false,
      isPopular: false,

      loading: false,
      category: null,
      data: null,
    };
  }

  readCategoryHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/category`)
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

  componentDidMount() {
    this.readCategoryHandler();
  }

  submitHandler = () => {
    const {
      name,
      icon,
      description,
      isFeatured,
      isPopular,
      category,
    } = this.state;

    var _object = {
      name,
      icon,
      description,
      isFeatured,
      isPopular,
      category,
    };
    this.setState({
      loading: true,
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/sub/category`, _object)
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

  handleSelectChange = (value) => {
    this.setState({
      category: value,
    });
  };

  render() {
    const { name, icon, description, loading, data } = this.state;

    return (
      <div className='registerMain'>
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Create sub category </h1>
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
                defaultValue='cat'
                style={{ width: "100%", background: "#f2f5fa" }}
                onChange={this.handleSelectChange}>
                <Option value='cat'>Category</Option>
                {data &&
                  data.map((item, index) => {
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
