import { ReactNode, createContext, useRef, useState } from "react";
import { Place } from "../types/types";
import useSearch from "../hooks/search/useSearch";

interface MapContextType {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  map: google.maps.Map | null;
  selectedPlace: Place | null;
  isMapView: boolean;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  handleMapMoveSelectedPlace: (place: Place) => void;
  setSelectedPlace: React.Dispatch<React.SetStateAction<Place | null>>;
  setIsMapView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapContext = createContext<MapContextType>({
  mapRef: { current: null },
  map: null,
  selectedPlace: null,
  isMapView: false,
  setMap: () => {},
  handleMapMoveSelectedPlace: () => {},
  setSelectedPlace: () => {},
  setIsMapView: () => {},
});
const MapContexProvider = ({ children }: { children: ReactNode }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isMapView, setIsMapView] = useState(!!selectedPlace);
  const { handleSearchAndRecent } = useSearch();

  const handleMapMoveSelectedPlace = (place: Place) => {
    setSelectedPlace(place);
    handleSearchAndRecent({
      searchQuery: place.place_name,
      type: "place",
      place,
    });
    setIsMapView(true);
    map?.panTo({ lat: +place.y, lng: +place.x });
    map?.setZoom(18);
  };

  return (
    <MapContext.Provider
      value={{
        mapRef,
        map,
        selectedPlace,
        isMapView,
        setMap,
        handleMapMoveSelectedPlace,
        setSelectedPlace,
        setIsMapView,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContexProvider;
