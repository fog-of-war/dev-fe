import React from "react";
import { Polygon } from "@react-google-maps/api";

interface SeoulPolygonProps {
  nameEng: string;
  path: { lat: number; lng: number }[];
  point: number;
  onPolygonClick: () => void;
}

const SeoulPolygon: React.FC<SeoulPolygonProps> = ({
  nameEng,
  path,
  point,
  onPolygonClick,
}) => {
  let opacity =
    point < 1000 ? 0.9 : point < 2000 ? 0.7 : point < 3000 ? 0.5 : 0.3;

  return (
    <Polygon
      paths={path}
      options={{
        fillColor: "#222",
        fillOpacity: opacity,
        strokeColor: "#555",
        strokeOpacity: 1,
        strokeWeight: 4,
      }}
      onClick={onPolygonClick}
    />
  );
};

export default SeoulPolygon;
