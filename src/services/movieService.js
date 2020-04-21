import http from "./httpService";
import { getGenres } from "./genreService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id; // delete _id property from request body because api already contains id
    return http.put(movieUrl(movie._id), body); // return a promise and end the function
  }
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
