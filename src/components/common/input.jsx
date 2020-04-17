import React from "react";

const Input = ({ name, label, value, error, onChange }) => {
  // ({ name, label, value, onChange }) are the destructured properties/methods of (props) object
  // Interface: { name, label, value, onChange } = props
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {/* if error is truthy, alert div will be returned; if error is falsy, alert div will be ignored */}
    </div>
  );
};

export default Input;
