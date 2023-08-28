import { ReactNode, createContext, useState } from "react";

interface MapContextType {
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

export const MapContext = createContext<MapContextType>({
  map: null,
  setMap: () => {},
});
const MapContexProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContexProvider;
