import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import seoulData from "../../data/seoul2.json";

const useCurrentLocation = () => {
  // 현재 위치를 저장하는 상태
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  // 현재 위치가 서울 내에 있는지 여부를 다루는 새로운 상태
  const [isInSeoul, setIsInSeoul] = useState<boolean>(false);

  // 사용자의 현재 위치를 가져와서 상태를 업데이트하는 함수
  const updateCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
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

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 현재 위치 업데이트 실행
    updateCurrentLocation();
  }, []);

  // 서울에 있지않으면 지도를 숨김
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocationLatLng = new google.maps.LatLng(
            latitude,
            longitude
          );

          // 현재 위치가 서울 폴리곤 내부에 있는지 확인합니다.
          const seoulPolygon = new google.maps.Polygon({
            paths: seoulData.features[0].geometry.coordinates[0][0].map(
              ([lng, lat]) => new google.maps.LatLng(lat, lng)
            ),
          });
          const isWithinSeoul = google.maps.geometry.poly.containsLocation(
            currentLocationLatLng,
            seoulPolygon
          );

          // 만약 서울 폴리곤 내부에 있다면 현재 위치를 업데이트하고, 그렇지 않다면 숨깁니다.
          if (isWithinSeoul) {
            setCurrentLocation({ lat: latitude, lng: longitude });
          } else {
            setCurrentLocation(null); // 아이콘 숨김
          }

          // 현재 위치가 서울 내에 있는지 여부를 상태로 설정
          setIsInSeoul(isWithinSeoul);
        },
        (error) => {
          console.error("현재 위치를 가져오는데 에러가 발생했습니다:", error);
          toast.error("현재 위치를 가져오는데 에러가 발생했습니다.");
        }
      );
    } else {
      toast.error("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  return currentLocation;
};

export default useCurrentLocation;
