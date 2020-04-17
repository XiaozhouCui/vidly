import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  handleChange = (e) => {
    // (e) can be destructured to ({ currentTarget: input}), then replace all "e.currentTarget" with "input"
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value; // don't use dot notation (account.username), because bracket notation (account[e.currentTarget.name]) can access multiple properties dynamically
    this.setState({ account });
  };

  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username} // making it a controlled element
            label="Username"
            onChange={this.handleChange} // two-way binding
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
