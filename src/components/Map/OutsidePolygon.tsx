import React from "react";
import { Polygon } from "@react-google-maps/api";
import { COORDINATES_STRING, OUTER_BOUNDS } from "../../data/mapData";

const parseCoordinates = (coordinateString: string) => {
  const coordinatePairs = coordinateString.trim().split(" ");
  return coordinatePairs.map((pair) => {
    const [lng, lat] = pair.split(",");
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  });
};

// 서울 지역의 좌표를 파싱하고 순서를 반전
const seoulCoordinates = parseCoordinates(COORDINATES_STRING);

const OutsidePolygon = () => {
  return (
    <Polygon
      paths={[OUTER_BOUNDS, seoulCoordinates]}
      options={{
        fillColor: "#B5DCC6",
        fillOpacity: 1,
        strokeOpacity: 0,
      }}
    />
  );
};

export default OutsidePolygon;
