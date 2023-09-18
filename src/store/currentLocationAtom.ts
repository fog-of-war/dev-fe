import { atom } from "recoil";

export interface CurrentLocationType {
  lat: number;
  lng: number;
}

export const currentLocationAtom = atom<CurrentLocationType | null>({
  key: "currentLocationState",
  default: null,
});
