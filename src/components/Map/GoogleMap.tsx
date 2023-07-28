import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScriptNext, Polygon } from "@react-google-maps/api";

import seoulData from "../../data/seoul2.json";
import retroMapStyle from "../../data/retroMapStyle.json";
import {
  defaultCenter,
  OUTER_BOUNDS,
  bounds,
  options,
  COORDINATES_STRING,
} from "../../data/mapData";

const containerStyle = {
  width: "650px",
  height: "600px",
};

const parseCoordinates = (coordinateString: string) => {
  const coordinatePairs = coordinateString.trim().split(" ");
  return coordinatePairs.map((pair) => {
    const [lng, lat] = pair.split(",");
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  });
};

// 서울 지역의 좌표를 파싱하고 순서를 반전
const seoulCoordinates = parseCoordinates(COORDINATES_STRING);

const Map = () => {
  const [polygons, setPolygons] = useState<
    {
      name: string;
      name_eng: string;
      path: { lat: number; lng: number }[];
      options: {};
    }[]
  >([]);

  const [view, setView] = useState({ center: defaultCenter, zoom: 11 });

  // 지도의 인스턴스를 참조하기 위한 ref 생성
  const mapRef = useRef<google.maps.Map | null>(null);

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // 현재의 확대 레벨을 추적하는 상태
  const [zoomLevel, setZoomLevel] = useState(11);

  function getCentroid(coords: any[]) {
    let center = coords.reduce(
      (x, y) => {
        return [x[0] + y.lng / coords.length, x[1] + y.lat / coords.length];
      },
      [0, 0]
    );
    return { lat: center[1], lng: center[0] };
  }

  useEffect(() => {
    if (view.center && mapRef.current) {
      setMapCenter(view.center);
      mapRef.current.setZoom(view.zoom);
    }
  }, [view]);

  useEffect(() => {
    const data = seoulData.features.map((feature) => {
      const name = feature.properties.name;
      const name_eng = feature.properties.NAME_1;
      const path = feature.geometry.coordinates[0][0].map(([lng, lat]) => ({
        lat,
        lng,
      }));

      return { name, name_eng, path, options: {} };
    });

    if (zoomLevel < 14) {
      setPolygons(data);
    } else {
      setPolygons([]); // 확대 레벨이 14 이상이면 색상이 있는 폴리곤을 숨깁니다.
    }

    return () => setPolygons([]);
  }, [zoomLevel]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadScriptNext
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={view.zoom}
          options={{
            minZoom: 11,
            restriction: {
              latLngBounds: bounds,
              strictBounds: false,
            },
            styles: retroMapStyle, // retro맵 스타일 적용
          }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onZoomChanged={() => {
            const newZoomLevel = mapRef.current?.getZoom() || 11;
            setZoomLevel(newZoomLevel);
          }}
        >
          {/* 한반도를 덮는 검은색 폴리곤 */}
          <Polygon
            paths={[OUTER_BOUNDS, seoulCoordinates]}
            options={{
              fillColor: "#000",
              fillOpacity: 1,
              strokeOpacity: 0,
            }}
          />
          {/* 서울 지역을 표시하는 다른 색상의 폴리곤 */}
          {polygons.map((polygon, index) => {
            const name_eng = polygon.name_eng;
            const point = options[name_eng].point;
            let opacity =
              point < 1000
                ? 0.9
                : point < 2000
                ? 0.7
                : point < 3000
                ? 0.5
                : 0.3;
            return (
              <Polygon
                key={index}
                paths={polygon.path}
                options={{
                  fillColor: "#222",
                  fillOpacity: opacity,
                  strokeColor: "#555",
                  strokeOpacity: 1,
                  strokeWeight: 4,
                }}
                onClick={() => {
                  const center = getCentroid(polygon.path);
                  setView({ center, zoom: 16 }); // 먼저 줌 레벨을 변경하고 그 다음에 중심을 변경
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default Map;
