import { ProfileSetupData } from "../types/types";
import { axiosBase } from "./axios";

export const setUpProfile = async (data: ProfileSetupData) => {
  axiosBase.patch("v1/users/me", data);
};

export const getUserData = async () => {
  const response = await axiosBase.get("v1/users/me");
  return response.data;
};

export const getMyBadge = async () => {
  const response = await axiosBase.get("v1/users/me/badges");
  return response.data;
};

export const getMyRegion = async () => {
  const response = await axiosBase.get("v1/users/me/region");
  return response.data;
};
