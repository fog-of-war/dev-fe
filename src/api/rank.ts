import { axiosBase } from "./axios";

export const getMyRank = async () => {
  const response = await axiosBase.get("v1/ranks/me");
  return response.data;
};

export const getAllRank = async () => {
  const response = await axiosBase.get("v1/ranks");
  return response.data;
};
