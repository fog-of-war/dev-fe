/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

import seoulData from "../../data/seoul2.json";
import mainCardMapStyle from "../../data/mainCardMapStyle.json";
import { defaultCenter, bounds, options } from "../../data/mapData";

import SeoulPolygon from "./SeoulPolygon";
import MainCardMapPolygon from "./MainCardMapPolygon";
import { getMyRegion } from "../../api/user";

// 컨테이너 크기 정의
const containerStyle = {
  width: "100%",
  height: "100%",
};

const MainCardMap = () => {
  const [polygons, setPolygons] = useState<
    {
      name: string;
      name_eng: string;
      path: { lat: number; lng: number }[];
      options: {};
    }[]
  >([]);

  const [view, setView] = useState({ center: defaultCenter, zoom: 10 });

  // 지도의 인스턴스를 참조하기 위한 ref 생성
  const mapRef = useRef<google.maps.Map | null>(null);

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // 현재의 확대 레벨을 추적하는 상태
  const [zoomLevel, setZoomLevel] = useState(11);

  const navigate = useNavigate();

  // map으로 이동하는 함수
  const handleMapClick = () => {
    navigate("/explore");
  };

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

    setPolygons(data);

    return () => setPolygons([]);
  }, [zoomLevel]);

  useEffect(() => {
    getMyRegion().then((regionData) => {
      // Response 데이터에서 구 이름과 포인트 값을 추출하여 options 객체에 반영
      regionData.forEach(
        (region: { region_english_name: any; region_visited_count: any }) => {
          const regionEnglishName = region.region_english_name;
          const regionVisitedCount = region.region_visited_count;

          if (options.hasOwnProperty(regionEnglishName)) {
            options[regionEnglishName].point = regionVisitedCount;
          }
        }
      );
    });
  }, []);

  return (
    <div
      css={{
        position: "relative",
        width: "100%",
        height: "100%",
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
            restriction: {
              latLngBounds: bounds,
              strictBounds: false,
            },
            styles: mainCardMapStyle,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            keyboardShortcuts: false, // 키보드 단축키 비활성화
            scaleControl: false, // 스케일 컨트롤 숨기기
            zoomControl: false, // 확대 축소 버튼 숨기기
            gestureHandling: "none", // 제스처 핸들링 비활성화
          }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onZoomChanged={() => {
            const newZoomLevel = mapRef.current?.getZoom() || 11;
            setZoomLevel(newZoomLevel);
          }}
        >
          <MainCardMapPolygon />
          {polygons.map((polygon, index) => (
            <SeoulPolygon
              key={index}
              nameEng={polygon.name_eng}
              path={polygon.path}
              point={options[polygon.name_eng].point}
              onPolygonClick={handleMapClick}
            />
          ))}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default MainCardMap;
