import { MutableRefObject, useState } from "react";
import { defaultCenter } from "../../data/mapData";
import { mapViewAtomState } from "../../store/mapAtom";
import { useRecoilState } from "recoil";

/**  */
const useMapGlobalState = (
  mapRef: MutableRefObject<google.maps.Map | null>
) => {
  // 페이지 이탈시 저장할 맵 상태
  const [mapViewState, setMapViewState] = useRecoilState(mapViewAtomState);
  const [center] = useState(mapViewState.center);
  const [zoom, setZoom] = useState(mapViewState.zoom);

  let debounceTimer: NodeJS.Timeout;

  // 지도 센터 변경시 맵 글로벌 상태 업데이트
  const handleMapChange = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const lat = center?.lat() ?? mapViewState.center.lat ?? defaultCenter.lat;
      const lng = center?.lng() ?? mapViewState.center.lng ?? defaultCenter.lng;
      const zoom = mapRef.current.getZoom()!;

      // 기존 타이머를 취소하고 새로운 타이머를 설정
      clearTimeout(debounceTimer);

      // 새로운 타이머 설정
      debounceTimer = setTimeout(() => {
        setMapViewState({ center: { lat, lng }, zoom });
      }, 300);
    }
  };

  // 지도 줌 변경시 맵 글로벌 상태 업데이트
  const handleZoomChange = () => {
    const zoom = mapRef.current?.getZoom() ?? mapViewState.zoom ?? 10.3;
    setZoom(zoom);

    // 기존 타이머를 취소하고 새로운 타이머를 설정
    clearTimeout(debounceTimer);

    // 새로운 타이머 설정
    debounceTimer = setTimeout(() => {
      setMapViewState({ ...mapViewState, zoom });
    }, 300); // 디바운스 딜레이 (예: 500 밀리초)
  };

  return {
    center,
    zoom,
    handleZoomChange,
    handleMapChange,
  };
};

export default useMapGlobalState;
