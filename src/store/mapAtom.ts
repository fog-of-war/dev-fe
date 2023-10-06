import { atom } from "recoil";
import { defaultCenter } from "../data/mapData";

export const mapViewAtomState = atom({
  key: "mapViewState",
  default: {
    center: defaultCenter,
    zoom: 10,
  },
});

export const mapStateAtom = atom<google.maps.Map | null>({
  key: "mapStateAtom",
  default: null,
});

export const selectedPlaceAtom = atom({
  key: "selectedPlaceAtom",
  default: null as string | null,
});
