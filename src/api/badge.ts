import { axiosBase } from "./axios";
import { Badges, MyBadges } from "../types/types";

export const getAllBadges = async (): Promise<Badges[]> => {
  const response = await axiosBase.get<Badges[]>("v1/badges");
  return response.data;
};

export const getMyBadges = async (): Promise<MyBadges> => {
  const response = await axiosBase.get<MyBadges>("v1/users/me/badges");
  return response.data;
};
