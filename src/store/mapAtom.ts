import { atom } from "recoil";
import { defaultCenter } from "../data/mapData";

export const mapViewAtomState = atom({
  key: "mapViewState",
  default: {
    center: defaultCenter,
    zoom: 10,
  },
});

export const selectedPlaceAtom = atom({
  key: "selectedPlaceAtom",
  default: null as string | null,
});
