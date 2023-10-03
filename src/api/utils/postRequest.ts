import { toast } from "react-hot-toast";
import { axiosBase } from "../axios";
import { getErrorMessage } from "../../utils/errorHandler";
import { AxiosRequestConfig } from "axios";

interface PostRequestProps {
  url: string;
  data?: any;
  config?: AxiosRequestConfig<any>;
  message?: string;
}

export const postRequest = async ({
  url,
  data,
  config,
  message,
}: PostRequestProps) => {
  try {
    const response = await axiosBase.post(url, data, config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    toast.error(message || errorMessage);
  }
};
