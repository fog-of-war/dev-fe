import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import seoulData from "./data/seoul.json";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.566826,
  lng: 126.9786567,
};

function Map() {
  const [polygons, setPolygons] = useState<{ lat: number; lng: number }[][]>(
    []
  );

  useEffect(() => {
    const data = seoulData.features.map((feature) => {
      return feature.geometry.coordinates[0].map(([lng, lat]) => ({
        lat,
        lng,
      }));
    });

    setPolygons(data);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB3ixB-V1mYdr7uNucQaUs_z3lOlVc4XzA">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={{ draggable: false }}
      >
        {polygons.map((path, index) => {
          return (
            <Polygon
              key={index}
              paths={path}
              options={{
                fillColor: "#000",
                fillOpacity: 0.8,
                strokeColor: "#fff",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
