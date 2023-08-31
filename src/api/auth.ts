import { axiosBase } from "./axios";
import { getDataFromLocalStorage } from "../utils/localStorage";
import { STORAGE_KEY } from "../constants/storage";

export const oAuthLogin = async (code: string, selectedOAuth: string) => {
  const response = await axiosBase.post(`v1/auth/${selectedOAuth}/oauth`, {
    code,
  });
  return response.data;
};

export const postRefreshToken = async () => {
  const refreshToken = getDataFromLocalStorage(STORAGE_KEY.REFRESH_TOKEN);
  const response = await axiosBase.post("v1/auth/refresh", {
    refreshToken,
  });
  return response;
};

export const getCurrentUser = async () => {
  const accessToken: string =
    getDataFromLocalStorage(STORAGE_KEY.ACCESS_TOKEN) || null;

  if (!accessToken) return null;
  const response = await axiosBase.get(`v1/users/me`);
  return response.data;
};
