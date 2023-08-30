import { axiosBase } from "./axios";

export const getLandmarks = async () => {
  const response = await axiosBase.get("v1/places/landmarks");
  return response.data;
};
