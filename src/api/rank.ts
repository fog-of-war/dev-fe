import { axiosBase } from "./axios";
import { UserRank, AllUserRank, RegionRank } from "../types/types";

export const getMyRank = async (): Promise<UserRank> => {
  const response = await axiosBase.get("v1/ranks/me");
  return response.data;
};

export const getAllRank = async (): Promise<AllUserRank[]> => {
  const response = await axiosBase.get("v1/ranks");
  return response.data;
};

export const getRegionRank = async (): Promise<RegionRank[]> => {
  const response = await axiosBase.get("v1/ranks/region");
  return response.data;
};
