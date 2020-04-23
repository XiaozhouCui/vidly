import React from "react";
import Joi from "joi-browser";
import Form from "./common/form"; // a form template without render method
import auth from "../services/authService";

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
      await auth.login(data.username, data.password);
      window.location = "/"; // dont't use history.push, need to fully reload the page to get jwt from localstroage
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
