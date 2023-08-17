import { axiosBase } from "./axios";

export const setUpProfile = async (data: {
  user_nickname: string;
  user_image_url: string;
}) => {
  axiosBase.patch("v1/users/me", { data });
};
