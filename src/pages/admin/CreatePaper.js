import React, { Component } from "react";
import { Button, Input, Radio, Select } from "antd";
import axios from "axios";
import "../../style/_form.scss";
const { TextArea } = Input;
const { Option } = Select;

export default class CreatePaper extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      pdf_url: "",
      yt_video_url: "",
      category: null,
      subCategory: null,
      year: null,
      stream: null,
      classCategory: null,
      data: null,
      data_sub_categories: null,
      data_year: null,
      data_stream: null,
      data_class: null,

      isFeatured: false,
      isTrend: false,
      isPopular: false,

      isCollege: false,
      isCompetetive: false,
      isSchool: false,
      isEnglish: false,

      loading: false,
    };
  }

  toggleChangeIsPopular = () => {
    this.setState({
      isPopular: !this.state.isPopular,
    });
  };

  toggleChangeIsTrend = () => {
    this.setState({
      isTrend: !this.state.isTrend,
    });
  };

  toggleChangeIsFeatured = () => {
    this.setState({
      isFeatured: !this.state.isFeatured,
    });
  };

  toggleChangeIsCompetetive = () => {
    this.setState({
      isCompetetive: !this.state.isCompetetive,
    });
  };

  toggleChangeIsCollege = () => {
    this.setState({
      isCollege: !this.state.isCollege,
    });
  };

  toggleChangeIsSchool = () => {
    this.setState({
      isSchool: !this.state.isSchool,
    });
  };

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

  readYearHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/year`)
      .then((data) => {
        this.setState({
          loading: false,
          data_year: data.data,
        });
      })
      .catch((err) => {
        console.log(err, "error", err);
        this.setState({
          loading: false,
        });
      });
  };

  readSubCategoryHandler = (categoryId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sub/category/${categoryId}`)
      .then((data) => {
        this.setState({
          loading: false,
          data_sub_categories: data.data,
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

  readStreamHandler = (categoryId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/stream/${categoryId}`)
      .then((data) => {
        this.setState({
          loading: false,
          data_stream: data.data,
        });
      })
      .catch((err) => {
        console.log(err, "error", err);
        this.setState({
          loading: false,
        });
      });
  };

  readClassHandler = (streamId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/class/category/${streamId}`)
      .then((data) => {
        this.setState({
          loading: false,
          data_class: data.data,
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
    this.readYearHandler();
  }

  submitHandler = () => {
    const {
      title,
      description,
      year,
      pdf_url,
      yt_video_url,
      isFeatured,
      isPopular,
      isTrend,
      category,
      subCategory,
      isCollege,
      isCompetetive,
      isSchool,
      isEnglish,
      stream,
      classCategory,
    } = this.state;

    var _object = {
      title,
      description,
      year,
      pdf_url,
      yt_video_url,
      isFeatured,
      isPopular,
      isTrend,
      category,
      subCategory,
      isCollege,
      isCompetetive,
      isSchool,
      isEnglish,
      stream,
      classCategory,
    };

    if (!isCollege && !isCompetetive && !isSchool) {
      return alert("Please one of them College or Competetive or School");
    }

    this.setState({
      loading: true,
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/paper`, _object)
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

  handleSelectChangeForCategory = (value) => {
    this.readSubCategoryHandler(value);
    this.setState({
      category: value,
    });
  };

  handleSelectChangeForSubCategory = (value) => {
    this.readStreamHandler(value);
    this.setState({
      subCategory: value,
    });
  };

  handleSelectChangeForYear = (value) => {
    this.setState({
      year: value,
    });
  };

  handleSelectChangeForStream = (value) => {
    this.readClassHandler(value);
    this.setState({
      stream: value,
    });
  };

  handleSelectChangeForClass = (value) => {
    this.setState({
      classCategory: value,
    });
  };

  render() {
    const {
      title,
      yt_video_url,
      pdf_url,
      description,
      loading,
      data,
      data_sub_categories,
      data_year,
      data_stream,
      data_class,
    } = this.state;

    return (
      <div className='registerMain'>
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Create paper </h1>
          <div className='inputFieldContainer'>
            {/* start */}
            <div className='singleField'>
              <h6>Title</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='title'
                value={title}
                placeholder=''
              />
            </div>

            <div className='singleField'>
              <h6>Year</h6>
              <Select
                size='large'
                defaultValue='yr'
                style={{ width: "100%", backgroundColor: "#f2f5fa" }}
                onChange={this.handleSelectChangeForYear}>
                <Option value='yr'>Select year</Option>
                {data_year &&
                  data_year.map((item, index) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.year}
                      </Option>
                    );
                  })}
              </Select>
            </div>

            <div className='singleField'>
              <h6>Pdf</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='pdf_url'
                value={pdf_url}
                placeholder=''
              />
            </div>

            <div className='singleField'>
              <h6>Youtube video link</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='yt_video_url'
                value={yt_video_url}
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

            <div
            // className='singleField'
            >
              <Select
                size='large'
                defaultValue='cat'
                style={{ width: "33%", background: "#f2f5fa" }}
                onChange={this.handleSelectChangeForCategory}>
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

              <Select
                size='large'
                defaultValue='sub_cat'
                style={{ width: "33%", background: "#f2f5fa" }}
                onChange={this.handleSelectChangeForSubCategory}>
                <Option value='sub_cat'>Sub Category</Option>
                {data_sub_categories &&
                  data_sub_categories.map((item, index) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>

              <Select
                size='large'
                defaultValue='str'
                style={{ width: "33%", background: "#f2f5fa" }}
                onChange={this.handleSelectChangeForStream}>
                <Option value='str'>Stream</Option>
                {data_stream &&
                  data_stream.map((item, index) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>

              <Select
                size='large'
                defaultValue='str'
                style={{ width: "33%", background: "#f2f5fa" }}
                onChange={this.handleSelectChangeForClass}>
                <Option value='str'>Class</Option>
                {data_class &&
                  data_class.map((item, index) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>

            {/* special case */}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <div className='singleFieldForCheckbox'>
                <input
                  type='checkbox'
                  checked={this.state.isCompetetive}
                  onChange={this.toggleChangeIsCompetetive}
                />
                <p>Compete</p>
              </div>

              <div className='singleFieldForCheckbox'>
                <input
                  type='checkbox'
                  checked={this.state.isCollege}
                  onChange={this.toggleChangeIsCollege}
                />
                <p>College</p>
              </div>

              <div className='singleFieldForCheckbox'>
                <input
                  type='checkbox'
                  checked={this.state.isSchool}
                  onChange={this.toggleChangeIsSchool}
                />
                <p>School</p>
              </div>

              <div className='singleFieldForCheckbox'>
                <input
                  type='checkbox'
                  checked={this.state.isFeatured}
                  onChange={this.toggleChangeIsFeatured}
                />
                <p> Featured</p>
              </div>

              <div className='singleFieldForCheckbox'>
                <input
                  type='checkbox'
                  checked={this.state.isPopular}
                  onChange={this.toggleChangeIsPopular}
                />
                <p> Popular</p>
              </div>

              <div className='singleFieldForCheckbox'>
                <input
                  type='checkbox'
                  checked={this.state.isTrend}
                  onChange={this.toggleChangeIsTrend}
                />
                <p> Trend</p>
              </div>
            </div>
            <Button
              disabled={!title || loading}
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
