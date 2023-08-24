import { MutableRefObject, useState } from "react";
import { defaultCenter } from "../../data/mapData";
import { mapViewAtomState } from "../../store/mapAtom";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";

const useGoogleMap = (mapRef: MutableRefObject<google.maps.Map | null>) => {
  const [mapViewState, setMapViewState] = useRecoilState(mapViewAtomState);
  const [view, setView] = useState(
    mapViewState ?? { center: defaultCenter, zoom: 10 }
  );

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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

  let debounceTimer: NodeJS.Timeout;

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
      }, 500); // 디바운스 딜레이 (예: 500 밀리초)
    }
  };

  const handleZoomChange = () => {
    const zoom = mapRef.current?.getZoom() ?? mapViewState.zoom ?? 10.3;

    setView({ ...view, zoom });

    // 기존 타이머를 취소하고 새로운 타이머를 설정
    clearTimeout(debounceTimer);

    // 새로운 타이머 설정
    debounceTimer = setTimeout(() => {
      setMapViewState({ ...mapViewState, zoom });
    }, 500); // 디바운스 딜레이 (예: 500 밀리초)
  };

  // 클릭한 마커의 위치로 지도 이동
  const handleMarkerClick = (markerPosition: google.maps.LatLngLiteral) => {
    if (mapRef.current) {
      mapRef.current.panTo(markerPosition);
    }
  };

  return {
    view,
    handleCurrentLocationClick,
    handlePolygonClick,
    handleZoomChange,
    handleMapChange,
    handleMarkerClick,
  };
};

export default useGoogleMap;
