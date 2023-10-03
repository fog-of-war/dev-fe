import axios from "axios";
import { postRefreshToken } from "./auth";
import { toast } from "react-hot-toast";
import { MESSAGE } from "../constants/messages";
import {
  getAccessTokenFromStorage,
  removeAccessTokenFromStorage,
  removeRefreshTokenFromStorage,
  setAccessTokenToStorage,
  setRefreshTokenToStorage,
} from "../utils/tokenStorage";

axios.defaults.withCredentials = true;

export const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosBase.interceptors.request.use(
  (config) => {
    const accessToken: string = getAccessTokenFromStorage() || null;

    if (accessToken) {
      // accessToken이 있는 경우 헤더에 토큰을 추가합니다.
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("요청에러");
    return Promise.reject(error);
  }
);

axiosBase.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 페이지로 넘어가야 함!");
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const response = await postRefreshToken();

        const newAccessToken: string = response?.data.access_token;
        const newRefreshToken: string = response?.data.refresh_token;

        setAccessTokenToStorage(newAccessToken);
        setRefreshTokenToStorage(newRefreshToken);
      } catch (error) {
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();
        toast.error(MESSAGE.LOGIN.EXPIRED);
      }

      const accessToken = getAccessTokenFromStorage(); // 갱신된 토큰을 가져옵니다.

      // 에러가 발생한 요청의 헤더를 갱신된 토큰으로 업데이트합니다.
      error.config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.request(error.config); // 갱신된 토큰으로 다시 요청을 보냅니다.
      return response; // 요청 재시도 결과를 반환합니다.
    }
    return Promise.reject(error);
  }
);
