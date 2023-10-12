import axios from "axios";
import { refreshTokens } from "./auth";

axios.defaults.withCredentials = true;

export const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosBase.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 페이지로 넘어가야 함!");
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await refreshTokens();

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);
