import { atom } from "recoil";

export const navigateModalState = atom({
  key: "navigateModalState",
  default: false,
});

export const navigateModalUrlState = atom({
  key: "navigateModalUrlState",
  default: {
    naverUrl: "",
    kakaoUrl: "",
  },
});
