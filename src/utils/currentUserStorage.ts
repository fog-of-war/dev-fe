import { STORAGE_KEY } from "../constants/storage";
import { UserData } from "../types/types";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  setDataToLocalStorage,
} from "./localStorage";

export const getCurrentUserFromStorage = (): UserData | null => {
  const currentUser = getDataFromLocalStorage(STORAGE_KEY.CURRENT_USER);
  if (!currentUser) return null;
  return currentUser;
};

export const setCurrentUserToStorage = <T extends Object>(data: T) => {
  setDataToLocalStorage(STORAGE_KEY.CURRENT_USER, data);
};

export const removeCurrentUserFromStorage = () => {
  removeDataFromLocalStorage(STORAGE_KEY.CURRENT_USER);
};
