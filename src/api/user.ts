import { ProfileSetupData } from "../types/types";
import { axiosBase } from "./axios";

export const setUpProfile = async (data: ProfileSetupData) => {
  axiosBase.patch("v1/users/me", data);
};

export const getUserData = async () => {
  const response = await axiosBase.get("v1/users/me");
  return response.data;
};
