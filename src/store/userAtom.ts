import { atom } from "recoil";
import { UserData } from "../types/types";

export const userDataState = atom<UserData | null>({
  key: "user",
  default: null,
});
