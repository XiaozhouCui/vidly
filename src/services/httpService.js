import axios from "axios";
import logger from "./logService";
import config from "../config.json";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export function getGenres() {
  return axios.get(config.genreEndpoint);
}

export function getMovies() {
  return axios.get(config.movieEndpoint);
}
