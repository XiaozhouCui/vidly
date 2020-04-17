import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; // [name] is a computed property
    const schema = { [name]: this.schema[name] }; // save a sub-schema using computed properties
    const { error } = Joi.validate(obj, schema); // Joi.validate() will return a result obj, sve result.error as "error"
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(); // validate() will return null if no error
    this.setState({ errors: errors || {} }); // if errors is truthy, setState({ errors: errors}); if error is null/falsy, setState({ errors: {}});
    if (errors) return; // don't call server if there is an error, return immediately.

    // Call the server
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    // ({ currentTarget: input}) is destructuring event object and save e.currentTarget as "input"
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value; // don't use dot notation (account.username), because bracket notation (account[e.currentTarget.name]) can access multiple properties dynamically

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username} // making it a controlled element
            label="Username"
            onChange={this.handleChange} // two-way binding
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
