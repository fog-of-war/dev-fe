import { useEffect, useState } from "react";
import seoulData from "../../data/seoul2.json";

interface Polygon {
  name: string;
  name_eng: string;
  path: { lat: number; lng: number }[];
  options: {};
}

const usePolygon = (zoomLevel: number) => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);

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

  return polygons;
};

export default usePolygon;
