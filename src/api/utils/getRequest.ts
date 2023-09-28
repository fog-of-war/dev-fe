import { errorLoging } from "../../utils/errorHandler";
import { axiosBase } from "../axios";

interface GetRequest {
  url: string;
  headers?: Record<string, string>;
}

export const getRequest = async ({ url, headers }: GetRequest) => {
  try {
    const response = await axiosBase.get(url, { headers: headers || {} });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: unknown) {
    errorLoging(error, "GET 요청 에러 : ");
    throw error;
  }
};
