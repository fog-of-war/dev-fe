import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/tokenAtom";

// axios.defaults.withCredentials = true;

export const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBase.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(
      localStorage.getItem("accessToken") ?? "{}"
    ).access_token;
    console.log(accessToken);
    if (accessToken) {
      // accessToken이 있는 경우 헤더에 토큰을 추가합니다.
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
