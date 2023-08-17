import axios from "axios";

// axios.defaults.withCredentials = true;

export const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
