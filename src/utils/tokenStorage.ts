import { STORAGE_KEY } from "../constants/storage";
import { getDataFromLocalStorage } from "./localStorage";

export const getAccessTokenFromStorage = () => {
  return getDataFromLocalStorage(STORAGE_KEY.ACCESS_TOKEN);
};

export const setAccessTokenToStorage = (accessToken: string) => {
  localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
};

export const removeAccessTokenFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
};

export const getRefreshTokenFromStorage = () => {
  return getDataFromLocalStorage(STORAGE_KEY.REFRESH_TOKEN);
};

export const setRefreshTokenToStorage = (refreshToken: string) => {
  localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
};

export const removeRefreshTokenFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
};
