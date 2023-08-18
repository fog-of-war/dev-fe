import { ProfileData } from "../pages/auth/ProfileSetupPage";
import { axiosBase } from "./axios";

export const setUpProfile = async (data: ProfileData) => {
  axiosBase.patch("v1/users/me", data);
};
