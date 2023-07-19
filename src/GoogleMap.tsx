import { GoogleMap, LoadScriptNext, Polygon } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import seoulData from "./data/seoul.json";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 37.566826,
  lng: 126.9786567,
};

const Map = () => {
  const [polygons, setPolygons] = useState<
    { name: string; coordinates: { lat: number; lng: number }[] }[]
  >([]);
  const [hoveredPolygon, setHoveredPolygon] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const polygons = seoulData.features.map((feature) => {
      const name = feature.properties.name;
      const coordinates = feature.geometry.coordinates[0].map(([lng, lat]) => ({
        lat,
        lng,
      }));
      return { name, coordinates };
    });

    setPolygons(polygons);

    // Mousemove event listener
    const handleMouseMove = (e: MouseEvent) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseOver = (name: string) => {
    setHoveredPolygon(name);
  };

  const handleMouseOut = () => {
    setHoveredPolygon(null);
  };

  return (
    <div>
      <LoadScriptNext googleMapsApiKey="AIzaSyB3ixB-V1mYdr7uNucQaUs_z3lOlVc4XzA">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{ minZoom: 11, draggable: false }}
        >
          {polygons.map(({ name, coordinates }, index) => (
            <Polygon
              key={index}
              paths={coordinates}
              options={{
                fillColor: hoveredPolygon === name ? "#d0d0d0" : "#000",
                fillOpacity: 0.8,
                strokeColor: "#fff",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
              onMouseOver={() => handleMouseOver(name)}
              onMouseOut={handleMouseOut}
            />
          ))}
        </GoogleMap>
      </LoadScriptNext>
      {/* 툴팁 출력 */}
      {hoveredPolygon && (
        <div
          className="tooltip"
          style={{
            position: "fixed",
            top: tooltipPosition.y,
            left: tooltipPosition.x,
          }}
        >
          {hoveredPolygon}
        </div>
      )}
    </div>
  );
};

export default Map;
