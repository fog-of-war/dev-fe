import { axiosBase } from "./axios";
import { errorLoging } from "../utils/errorHandler";
import { MESSAGE } from "../constants/messages";

export const getLandmarks = async () => {
  const response = await axiosBase.get("v1/places/landmarks");
  return response.data;
};

export const getPlacesBySearchQuery = async (
  query: string,
  x: number,
  y: number
) => {
  try {
    const response = await axiosBase.get(
      `v1/places/search?query=${query}&x=${x}&y=${y}`
    );
    return response.data;
  } catch (error: unknown) {
    errorLoging(error, "검색 결과 조회 실패 : ");
    throw new Error(MESSAGE.SEARCH.ERROR);
  }
};
