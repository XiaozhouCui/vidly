import React, { Component } from "react";
import _ from "lodash";

// interface: data(movies array), columns,

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item); // short hand syntax for if-else statement
    return _.get(item, column.path); // lodash get method solved the problem of getting item['genre.name']
  };

  render() {
    const { data, columns } = this.props; // define interface by object destructuring

    return (
      <tbody>
        {data.map((item) => (
          <tr>
            {columns.map((column) => (
              <td>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
