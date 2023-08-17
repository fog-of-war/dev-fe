import { axiosBase } from "./axios";

export const oAuthLogin = async (name: string) => {
  const reponse = await axiosBase.get(`v1/auth/${name}`);
  return reponse.data;
};
