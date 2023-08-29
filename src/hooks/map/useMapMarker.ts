import React, { useContext, useEffect, useState } from "react";
import { Place } from "../../types/types";
import { MapContext } from "../../context/MapContext";

// Marker 데이터 인터페이스 정의
interface MarkerData {
  position: google.maps.LatLngLiteral;
  placeName: string;
  roadAddress: string;
  category: string;
  x: number;
  y: number;
}

const useMapMarker = (
  places: Place[] | undefined,
  mapRef: React.MutableRefObject<google.maps.Map | null>
) => {
  const { selectedPlace } = useContext(MapContext);

  // 마커 데이터 상태 관리
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // 마커 클릭 시 정보창을 열기 위한 상태
  const [openMarkerName, setOpenMarkerName] = useState<string | null>(null);

  // 클릭한 마커의 위치로 지도 이동
  const handleMarkerClick = (markerPosition: google.maps.LatLngLiteral) => {
    if (mapRef.current) {
      mapRef.current.panTo(markerPosition);
    }
  };

  // Map 컴포넌트가 마운트되거나 places props가 변경되면 마커 데이터 업데이트
  useEffect(() => {
    if (places) {
      // places 데이터를 기반으로 markers 배열 생성
      const newMarkers = places.map((place) => ({
        position: {
          lng: +place.x,
          lat: +place.y,
        },
        placeName: place.place_name,
        roadAddress: place.road_address_name,
        category: place.category_name,
        x: +place.x,
        y: +place.y,
      }));
      setMarkers(newMarkers);
    }
  }, [places]);

  useEffect(() => {
    if (selectedPlace) {
      setOpenMarkerName(selectedPlace.place_name);
    }
  }, [selectedPlace]);

  return { markers, openMarkerName, setOpenMarkerName, handleMarkerClick };
};

export default useMapMarker;
