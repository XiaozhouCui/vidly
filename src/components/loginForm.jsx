import React from "react";
import Joi from "joi-browser";
import Form from "./common/form"; // a form template without render method
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password); // response's data property will include a json web token
      localStorage.setItem("token", jwt);
      this.props.history.push("/");
    } catch (ex) {
      // expected error: invalid username/password
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors }); // errors in state will be shown as validation message
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          {/* this renderButton() method is inherited from "Form" component */}
        </form>
      </div>
    );
  }
}

export default LoginForm;
