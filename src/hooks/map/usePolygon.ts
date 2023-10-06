import { useEffect, useState } from "react";
import seoulData from "../../data/seoul2.json";
import { options } from "../../data/mapData";
import { getMyRegion } from "../../api/user";

interface Polygon {
  name: string;
  name_eng: string;
  path: { lat: number; lng: number }[];
  options: {};
}

/** 폴리곤 관련 로직을 모아 놓은 커스텀 훅 */
const usePolygon = (zoomLevel: number, map: google.maps.Map | null) => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);

  /** 중심점을 기준으로 지도의 확대 레벨을 변경하는 함수 */
  const getCentroid = (coords: any[]) => {
    let center = coords.reduce(
      (x, y) => {
        return [x[0] + y.lng / coords.length, x[1] + y.lat / coords.length];
      },
      [0, 0]
    );
    return { lat: center[1], lng: center[0] };
  };

  /** 폴리곤 클릭시 폴리곤 중앙 좌표로 이동 및 확대시키는 함수 */
  const handlePolygonClick = (polygonPath: { lat: number; lng: number }[]) => {
    const center = getCentroid(polygonPath);
    const zoomSteps = [12, 14, 16]; // 확대할 줌 레벨
    const delay = 300; // 각 단계별 지연 시간 (밀리초)

    let currentIndex = 0;

    const zoomStep = () => {
      if (currentIndex < zoomSteps.length) {
        map?.setZoom(zoomSteps[currentIndex]);
        map?.panTo(center);
        currentIndex++;
        setTimeout(zoomStep, delay);
      }
    };

    zoomStep();
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

    if (zoomLevel < 14) {
      setPolygons(data);
    } else {
      setPolygons([]); // 확대 레벨이 14 이상이면 색상이 있는 폴리곤을 숨깁니다.
    }

    return () => setPolygons([]);
  }, [zoomLevel]);

  // 내가 방문한 지역 정보를 가져와서 options 객체에 반영하는 함수
  const updateVisitedRegions = () => {
    getMyRegion().then((regionData) => {
      const updatedOptions = { ...options }; // options 객체를 복사합니다.

      regionData.forEach(
        (region: { region_english_name: any; region_visited_count: any }) => {
          const regionEnglishName = region.region_english_name;
          const regionVisitedCount = region.region_visited_count;

          if (updatedOptions.hasOwnProperty(regionEnglishName)) {
            updatedOptions[regionEnglishName].point = regionVisitedCount;
          }
        }
      );
    });
  };

  return { polygons, handlePolygonClick, updateVisitedRegions };
};

export default usePolygon;
