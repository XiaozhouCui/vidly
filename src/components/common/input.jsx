import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  // ({ type, name, label, value, error, onChange }) are the destructured properties/methods of (props) object
  // "...rest" parameter will cover all other parameters like "value, type, onChange"
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {/* <input {...rest} /> is equivalent to <input value={value} type={type} onChange={onChange} /> */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* if error is truthy, alert div will be returned; if error is falsy, alert div will be ignored */}
    </div>
  );
};

export default Input;
