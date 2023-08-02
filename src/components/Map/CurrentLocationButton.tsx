import { useEffect, useRef } from "react";

interface CurrentLocationButtonProps {
  map: google.maps.Map | null;
  setMapCenter: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  setView: React.Dispatch<
    React.SetStateAction<{ center: { lat: number; lng: number }; zoom: number }>
  >;
}

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  map,
  setMapCenter,
  setView,
}) => {
  const controlButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (map && controlButtonRef.current) {
      // 지도의 오른쪽 아래에 컨트롤을 추가합니다.
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        controlButtonRef.current
      );
    }
  }, [map]);

  // 사용자의 현재 위치로 이동하는 함수
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
        }
      );
    } else {
      console.error("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  return (
    <div ref={controlButtonRef}>
      <img
        src="/images/map/currentLocation.png"
        width="57px"
        height="57px"
        style={{
          cursor: "pointer",
        }}
        alt="현재 위치로 이동"
        onClick={handleCurrentLocationClick}
      />
    </div>
  );
};

export default CurrentLocationButton;
