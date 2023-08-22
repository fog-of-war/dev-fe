import { atom } from "recoil";
import { defaultCenter } from "../data/mapData";

export const mapViewAtomState = atom({
  key: "mapViewState",
  default: {
    center: defaultCenter,
    zoom: 10,
  },
});
