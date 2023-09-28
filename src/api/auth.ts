import { axiosBase } from "./axios";
import { STORAGE_KEY } from "../constants/storage";
import axios from "axios";
import { errorLoging } from "../utils/errorHandler";
import {
  getAccessTokenFromStorage,
  getRefreshTokenFromStorage,
} from "../utils/tokenStorage";

export const oAuthLogin = async (code: string, selectedOAuth: string) => {
  const response = await axiosBase.post(`v1/auth/${selectedOAuth}/oauth`, {
    code,
  });
  return response.data;
};

export const postRefreshToken = async () => {
  const refreshToken = getRefreshTokenFromStorage();
  if (!refreshToken) return null;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}v1/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response;
  } catch (error: unknown) {
    errorLoging(error, "토큰 재발급 요청에러 : ");
    return null;
  }
};

export const getCurrentUser = async () => {
  const accessToken: string = getAccessTokenFromStorage() || null;

  if (accessToken) {
    try {
      const response = await axiosBase.get(`v1/users/me`);
      return response.data;
    } catch (error: unknown) {
      errorLoging(error, "로그인 유저정보 요청에러 : ");
      return null;
    }
  }

  return null;
};

export const removeTokenInStore = async () => {
  localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
};
