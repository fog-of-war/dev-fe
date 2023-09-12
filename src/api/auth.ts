import { axiosBase } from "./axios";
import { getDataFromLocalStorage } from "../utils/localStorage";
import { STORAGE_KEY } from "../constants/storage";
import axios from "axios";

export const oAuthLogin = async (code: string, selectedOAuth: string) => {
  const response = await axiosBase.post(`v1/auth/${selectedOAuth}/oauth`, {
    code,
  });
  return response.data;
};

export const postRefreshToken = async () => {
  const refreshToken = getDataFromLocalStorage(STORAGE_KEY.REFRESH_TOKEN);
  if (!refreshToken) return null;
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
};

export const getCurrentUser = async () => {
  const accessToken: string =
    getDataFromLocalStorage(STORAGE_KEY.ACCESS_TOKEN) || null;

  if (!accessToken) return null;
  const response = await axiosBase.get(`v1/users/me`);
  return response.data;
};

export const removeTokenInStore = async () => {
  localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
};
