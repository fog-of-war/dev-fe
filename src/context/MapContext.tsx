import { ReactNode, createContext, useRef, useState } from "react";
import { Place } from "../types/types";
import { useNavigate } from "react-router-dom";

interface MapContextType {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  map: google.maps.Map | null;
  selectedPlace: Place | null;
  isMapView: boolean;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  handleMoveSelectedPlace: (place: Place) => void;
  setSelectedPlace: React.Dispatch<React.SetStateAction<Place | null>>;
  setIsMapView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapContext = createContext<MapContextType>({
  mapRef: { current: null },
  map: null,
  selectedPlace: null,
  isMapView: false,
  setMap: () => {},
  handleMoveSelectedPlace: () => {},
  setSelectedPlace: () => {},
  setIsMapView: () => {},
});
const MapContexProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const mapRef = useRef<google.maps.Map | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isMapView, setIsMapView] = useState(!!selectedPlace);

  const handleMoveSelectedPlace = (place: Place) => {
    setSelectedPlace(place);
    navigate(`/search/result?query=${place.place_name}`);
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
        handleMoveSelectedPlace,
        setSelectedPlace,
        setIsMapView,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContexProvider;
