import { axiosBase } from "./axios";
import { errorLoging } from "../utils/errorHandler";
import { postRequest } from "./utils/postRequest";
import { ERROR_MESSAGE } from "../constants/messages";
import axios from "axios";
import { setAccessTokenToStorage } from "../utils/tokenStorage";

export const oAuthLogin = async (code: string, selectedOAuth: string) => {
  return await postRequest({
    url: `v1/auth/${selectedOAuth}/oauth`,
    data: { code },
  });
};

export const postRefreshToken = async () => {
  const reponse = await postRequest({ url: "v1/auth/refresh" });
  const accessToken = reponse.access_token;
  setAccessTokenToStorage(accessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
