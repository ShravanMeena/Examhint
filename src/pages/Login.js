import React, { Component } from "react";
import { Button, Input } from "antd";
import "../style/_form.scss";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      password: "",

      verify: false,
    };
  }

  submitHandler = () => {
    const { id, password } = this.state;

    if (!id || !password) {
      alert("You are not authorized");
    }

    if (id === 9660801827 || password === "9660801827") {
      this.setState({
        verify: true,
      });
      setTimeout(() => {
        localStorage.setItem("verify", JSON.stringify(this.state));
        this.props.history.push("/dashboard");
      }, 100);
      return;
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { id, password } = this.state;

    return (
      <div className='registerMain'>
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Please verify</h1>
          <div className='inputFieldContainer'>
            <div className='singleField'>
              <h6>Secret id</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='id'
                value={id}
                placeholder=''
              />
            </div>

            <div className='singleField'>
              <h6>Secret password</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='password'
                value={password}
                placeholder=''
              />
            </div>

            <Button
              size='large'
              onClick={this.submitHandler}
              style={{ marginTop: 10 }}>
              Verify
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
