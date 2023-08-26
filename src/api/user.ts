import { ProfileData } from "../pages/auth/ProfileSetupPage";
import { UserData } from "../types/types";
import { axiosBase } from "./axios";

export const setUpProfile = async (data: ProfileData) => {
  axiosBase.patch("v1/users/me", data);
};

export const getUserData = async (): Promise<UserData[]> => {
  const response = await axiosBase.get<UserData[]>("v1/users/me");

  return response.data;
};
