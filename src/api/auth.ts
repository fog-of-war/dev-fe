import { toast } from "react-hot-toast";
import { axiosBase } from "./axios";

export const oAuthLogin = async (code: string, selectedOAuth: string) => {
  const response = await axiosBase.post(`v1/auth/${selectedOAuth}/oauth`, {
    code,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const accessTokenJSON = localStorage.getItem("accessToken");
  const accessToken: string =
    accessTokenJSON && JSON.parse(accessTokenJSON).access_token;

  if (!accessToken) return null;
  try {
    const response = await axiosBase.get(`v1/users/me`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      return null;
    }
    toast.error(error.response.data.message);
  }
};
