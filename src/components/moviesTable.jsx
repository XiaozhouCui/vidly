import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link> // column one is the movie titles linking to movie forms
      ),
    },
    { path: "genre.name", label: "Genre" }, // column 2 is genre
    { path: "numberInStock", label: "Stock" }, // column 3 is numbmer in stock
    { path: "dailyRentalRate", label: "Rate" }, // column 4 is rating
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeToggle={() => this.props.onLike(movie)}
        /> // column 5 is the toggle like button
      ),
    },
  ];

  // the clumn 6 containing delete buttons is only for admin users
  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn); // if user is addmin, add delete buttons to table
  }

  render() {
    const { movies, onSort, sortColumn } = this.props; // define interface by object destructuring

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
