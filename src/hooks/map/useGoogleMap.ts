import { MutableRefObject, useEffect, useState } from "react";
import { defaultCenter, bounds, options } from "../../data/mapData";
import { toast } from "react-hot-toast";

const useGoogleMap = (mapRef: MutableRefObject<google.maps.Map | null>) => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [view, setView] = useState({ center: defaultCenter, zoom: 10 });

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setView({ center: { lat: latitude, lng: longitude }, zoom: 16 });
        },
        (error) => {
          console.error("현재 위치를 가져오는데 에러가 발생했습니다:", error);
          toast.error("현재 위치를 가져오는데 에러가 발생했습니다.");
        }
      );
    } else {
      toast.error("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  // 중심점을 기준으로 지도의 확대 레벨을 변경하는 함수
  const getCentroid = (coords: any[]) => {
    let center = coords.reduce(
      (x, y) => {
        return [x[0] + y.lng / coords.length, x[1] + y.lat / coords.length];
      },
      [0, 0]
    );
    return { lat: center[1], lng: center[0] };
  };

  // 폴리곤 클릭시 폴리곤 중앙으로 이동시키는 함수
  const handlePolygonClick = (polygonPath: { lat: number; lng: number }[]) => {
    const center = getCentroid(polygonPath);
    setView({ center, zoom: 16 });
  };

  useEffect(() => {
    if (view.center && mapRef.current) {
      setMapCenter(view.center);
      mapRef.current.setZoom(view.zoom);
    }
  }, [view]);

  return { mapCenter, view, handleCurrentLocationClick, handlePolygonClick };
};

export default useGoogleMap;
