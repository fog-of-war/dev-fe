import { STORAGE_KEY } from "../constants/storage";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  setDataToLocalStorage,
} from "./localStorage";

export const getAccessTokenFromStorage = () => {
  return getDataFromLocalStorage(STORAGE_KEY.ACCESS_TOKEN);
};

export const setAccessTokenToStorage = (accessToken: string) => {
  setDataToLocalStorage(STORAGE_KEY.ACCESS_TOKEN, accessToken);
};

export const removeAccessTokenFromStorage = () => {
  removeDataFromLocalStorage(STORAGE_KEY.ACCESS_TOKEN);
};

export const getRefreshTokenFromStorage = () => {
  return getDataFromLocalStorage(STORAGE_KEY.REFRESH_TOKEN);
};

export const setRefreshTokenToStorage = (refreshToken: string) => {
  setDataToLocalStorage(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
};

export const removeRefreshTokenFromStorage = () => {
  removeDataFromLocalStorage(STORAGE_KEY.REFRESH_TOKEN);
};
