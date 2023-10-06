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
    point <= 3
      ? 0.9
      : point <= 10
      ? 0.7
      : point <= 20
      ? 0.5
      : point <= 50
      ? 0.3
      : point <= 100
      ? 0.1
      : 0;

  return (
    <Polygon
      paths={path}
      options={{
        fillColor: "#15473E",
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
