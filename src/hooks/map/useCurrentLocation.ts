import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Geocode from "react-geocode";
import { useSetRecoilState } from "recoil";
import { currentLocationAtom } from "../../store/currentLocationAtom";

const useCurrentLocation = () => {
  // 현재 위치를 저장하는 상태
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isInSeoul, setIsInSeoul] = useState<boolean>(false);
  const setCurrentLocationGlobalState = useSetRecoilState(currentLocationAtom);

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

  useEffect(() => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!);

    // 현재 위치 정보 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocationGlobalState({ lat, lng });

        // 위도와 경도를 주소로 변환하여 가져오기
        Geocode.fromLatLng(lat.toString(), lng.toString()).then(
          (response) => {
            const address = response.results[0].formatted_address;
            if (address.includes("Seoul")) {
              setIsInSeoul(true);
            } else {
              setIsInSeoul(false);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return { currentLocation, isInSeoul };
};

export default useCurrentLocation;
