import axios from "axios";
import { refreshTokens } from "./auth";

axios.defaults.withCredentials = true;

export const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let countsOf401 = 0; // 401 오류 횟수를 추적하기 위한 변수

axiosBase.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 페이지로 넘어가야 함!");
    }
    return response;
  },

  async (error) => {
    if (error.response?.status === 401) {
      if (countsOf401 < 3) { // 3번 미만으로만 시도하도록 수정
        countsOf401++;
        await refreshTokens();
        console.log("401 오류 발생", countsOf401);
        const response = await axios.request(error.config);
        countsOf401 = 0; // 성공적으로 요청을 보내면 다시 0으로 초기화
        return response;
      } else {
        console.log("401 오류가 3번 발생하여 처리를 중단합니다.");
        localStorage.clear();
        window.location.href = "/v1/auth";
      }
    }
    return Promise.reject(error);
  }
);
