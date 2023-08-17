import { axiosBase } from "./axios";

export const oAuthLogin = async (code: string, selectedOAuth: string) => {
  const response = await axiosBase.post(`v1/auth/${selectedOAuth}/oauth`, {
    code,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const accessToken = JSON.parse(
    localStorage.getItem("accessToken") ?? "{}"
  ).access_token;
  if (!accessToken) return null;
  const response = await axiosBase.get(`v1/users/me`);
  return response.data;
};
