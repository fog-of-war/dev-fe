import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const recentSearchHistoryState = atom({
  key: "recentSearchHistory",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
