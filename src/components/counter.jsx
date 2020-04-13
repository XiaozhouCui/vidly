import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.counter !== this.props.counter) {
      console.log("Counter - Updated, prevProps: ", prevProps);
    }
  }

  componentWillUnmount() {
    console.log("Counter - Unmount");
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  render() {
    console.log("Counter - Rendered");
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
