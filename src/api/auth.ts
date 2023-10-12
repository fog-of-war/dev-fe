import { axiosBase } from "./axios";
import { errorLoging } from "../utils/errorHandler";
import { postRequest } from "./utils/postRequest";
import { ERROR_MESSAGE, MESSAGE } from "../constants/messages";
import axios from "axios";
import {
  removeAccessTokenFromStorage,
  setAccessTokenToStorage,
} from "../utils/tokenStorage";
import { removeDataFromLocalStorage } from "../utils/localStorage";
import { STORAGE_KEY } from "../constants/storage";
import { toast } from "react-hot-toast";

export const oAuthLogin = async (code: string, selectedOAuth: string) => {
  return await postRequest({
    url: `v1/auth/${selectedOAuth}/oauth`,
    data: { code },
  });
};

export const refreshTokens = async () => {
  try {
    const response = await axiosBase.post(`v1/auth/refresh`);
    const accessToken = response.data.access_token;
    setAccessTokenToStorage(accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } catch (error: unknown) {
    errorLoging(error, "토큰 리프레시 요청에러 : ");
    toast.error(MESSAGE.LOGIN.EXPIRED);
    removeAccessTokenFromStorage();
    removeDataFromLocalStorage(STORAGE_KEY.CURRENT_USER);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosBase.get(`v1/users/me`);
    return response.data;
  } catch (error: unknown) {
    errorLoging(error, "로그인 유저정보 요청에러 : ");
    return null;
  }
};

export const logout = async () => {
  await postRequest({ url: `v1/auth/logout`, message: ERROR_MESSAGE.LOGOUT });
};
