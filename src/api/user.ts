import { ProfileSetupData } from "../components/ProfileSetup/ProfileSetupComponent";
import { UserEditdata } from "../types/types";
import { axiosBase } from "./axios";

/** 처음 가입시 닉네임, 프로필사진 설정 */
export const setUpProfile = async (data: ProfileSetupData) => {
  axiosBase.patch("v1/users/me", data);
};

/** 프로필 수정페이지에서 닉네임, 프로필사진, 대표 칭호 설정 */
export const editProfile = async (data: UserEditdata) => {
  const reqData= {...data, user_selected_badge_id : data.user_selected_badge.badge_id};
  delete reqData.user_selected_badge;
  console.log("Data" ,)
  axiosBase.patch("v1/users/me", reqData);
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

export const deleteUser = async () => {
  await axiosBase.delete("v1/auth/leave");
};
