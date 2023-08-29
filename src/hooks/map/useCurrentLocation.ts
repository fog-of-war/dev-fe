import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Geocode from "react-geocode";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentLocationAtom } from "../../store/currentLocationAtom";
import { MapContext } from "../../context/MapContext";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!);

/** 현재 위치를 기반으로하는 커스텀 훅 */
const useCurrentLocation = () => {
  const { map } = useContext(MapContext);

  // 현재 위치를 저장하는 상태
  const [currentLocation, setCurrentLocation] =
    useRecoilState<google.maps.LatLngLiteral | null>(currentLocationAtom);

  // 현재 위치가 서울인지 여부를 저장하는 상태
  const [isInSeoul, setIsInSeoul] = useState<boolean>(false);

  /** 현 위치로 이동 시켜주는 클릭 핸들러 */
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map?.panTo({ lat: latitude, lng: longitude });
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

  /** 사용자의 현재 위치를 가져와서 상태를 업데이트하는 함수 */
  const updateCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          checkIsInSeoul(latitude, longitude);
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

  /** 현재 위치가 서울인지 체크하는 함수 */
  const checkIsInSeoul = (lat: number, lng: number) => {
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
  };

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 현재 위치 업데이트 실행
    updateCurrentLocation();
  }, []);

  useEffect(() => {
    if (!currentLocation) {
      toast.loading("현재 위치를 불러오는 중입니다.");
    }

    if (currentLocation) {
      toast.dismiss();
    }
  }, [currentLocation]);

  return { currentLocation, isInSeoul, handleCurrentLocationClick };
};

export default useCurrentLocation;
