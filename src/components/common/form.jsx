import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

// This Form component doesn't have a render() method, and can only be extended by other components.
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
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

    this.doSubmit(); // this method is defined by the component extending this Form component;
  };

  handleChange = ({ currentTarget: input }) => {
    // ({ currentTarget: input}) is destructuring event object and save e.currentTarget as "input"
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value; // don't use dot notation (data.username), because bracket notation (data[e.currentTarget.name]) can access multiple properties dynamically

    this.setState({ data, errors });
  };

  renderButton(label) {
    // to render jsx, "return" must be used
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type} // if no type argument is passed in, defalut type is "text"
        name={name}
        value={data[name]} // making it a controlled element
        label={label}
        onChange={this.handleChange} // two-way binding
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]} // making it a controlled element
        label={label}
        options={options}
        onChange={this.handleChange} // two-way binding
        error={errors[name]}
      />
    );
  }
}

export default Form;
