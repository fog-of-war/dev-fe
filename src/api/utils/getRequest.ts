import { AxiosRequestConfig } from "axios";
import { errorLoging } from "../../utils/errorHandler";
import { axiosBase } from "../axios";

interface GetRequest {
  url: string;
  config?: AxiosRequestConfig<any>;
}

export const getRequest = async ({ url, config }: GetRequest) => {
  try {
    const response = await axiosBase.get(url, config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: unknown) {
    errorLoging(error, "GET 요청 에러 : ");
    throw error;
  }
};
