import React from "react";
import { Redirect } from "react-router-dom";
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
      const { state } = this.props.location; // check if the user is redirected to login page from other page
      window.location = state ? state.from.pathname : "/"; // if the user is redirected here, then after login, the user will see the page before redirection
      // dont't use history.push for redirecting, need to fully reload the page to get jwt from localstroage
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
    if (auth.getCurrentUser()) return <Redirect to="/" />;
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
