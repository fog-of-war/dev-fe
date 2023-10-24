import { atom } from "recoil";

export const isInSeoulAtom = atom<boolean>({
  key: "isInSeoul",
  default: false,
});
