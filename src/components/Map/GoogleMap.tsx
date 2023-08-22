/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

import { toast } from "react-hot-toast";
import retroMapStyle from "../../data/retroMapStyle.json";
import { defaultCenter, bounds, options } from "../../data/mapData";

import SeoulPolygon from "./SeoulPolygon";
import OutsidePolygon from "./OutsidePolygon";
import CustomMarker from "./CustomMarker";
import useCurrentLocation from "../../hooks/map/useCurrentLocation";
import CurrentLocationButton from "./CurrentLocationButton";
import usePolygon from "../../hooks/map/usePolygon";
import useGoogleMap from "../../hooks/map/useGoogleMap";

// Marker 데이터 인터페이스 정의
interface MarkerData {
  position: google.maps.LatLngLiteral;
  placeName: string;
  roadAddress: string;
  category: string;
  x: number;
  y: number;
}

// 컨테이너 크기 정의
const containerStyle = {
  width: "100%",
  height: "100%",
};

// 숭례문 좌표
const seongnyemunLocation = {
  lat: 37.55999955137636,
  lng: 126.97530447956169,
};

const Map = () => {
  // 지도의 인스턴스를 참조하기 위한 ref 생성
  const mapRef = useRef<google.maps.Map | null>(null);

  // 현재의 확대 레벨을 추적하는 상태
  const [zoomLevel, setZoomLevel] = useState(11);

  // 마커 데이터 상태 관리
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // 마커 클릭 시 정보창을 열기 위한 상태
  const [openMarkerIndex, setOpenMarkerIndex] = useState<number | null>(null);

  // 현재 위치 마커 아이콘 이미지 URL
  const currentLocationIconUrl = "/images/map/humanIcon.png";

  // 카테고리 상태 관리 아직 사용하지 않음
  const categories = ["역사", "미술관", "커피", "맛집", "스포스시설"];

  const { mapCenter, view, handleCurrentLocationClick, handlePolygonClick } =
    useGoogleMap(mapRef);
  const currentLocation = useCurrentLocation();
  const polygons = usePolygon(zoomLevel);

  console.log(currentLocation);

  // 음식점 검색 및 마커 데이터 업데이트 함수
  const handleSearch = async () => {
    try {
      const category = "스포츠시설";

      // 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?y=${latitude}&x=${longitude}&radius=2000`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            },
            params: {
              query: category,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          // API에서 받아온 데이터를 기반으로 마커 데이터 생성
          const newMarkers: MarkerData[] = data.documents.map(
            (document: any) => ({
              position: {
                lat: parseFloat(document.y),
                lng: parseFloat(document.x),
              },
              placeName: document.place_name,
              roadAddress: document.road_address_name,
              category: category,
              x: document.x,
              y: document.y,
            })
          );
          // 마커 데이터 업데이트
          setMarkers(newMarkers);
        } else {
          toast.error("API 호출 중 오류 발생");
        }
      });
    } catch (error) {
      toast.error("API 호출 중 오류 발생");
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 음식점 검색 및 마커 업데이트 실행
    handleSearch();
  }, []);

  return (
    <div
      css={{
        position: "absolute",
        inset: 0,
        marginBottom: 65,
        width: "100%",
      }}
    >
      <LoadScriptNext
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={view.zoom}
          options={{
            minZoom: 10.3,
            restriction: {
              latLngBounds: bounds,
              strictBounds: false,
            },
            styles: retroMapStyle,
            mapTypeControl: false, // 지도/위성 전환 버튼 비활성화
            fullscreenControl: false, // 구글 지도 전체 화면 보기 아이콘 비활성화
            streetViewControl: false, // 로드뷰 버튼 비활성화
          }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onZoomChanged={() => {
            const newZoomLevel = mapRef.current?.getZoom() || 10.3;
            setZoomLevel(newZoomLevel);
          }}
        >
          {/* 서울 주변 폴리곤 */}
          <OutsidePolygon />
          {/* 마커 렌더링 */}
          {zoomLevel >= 14 &&
            markers.map((marker, index) => (
              <CustomMarker
                key={index}
                position={marker.position}
                placeName={marker.placeName}
                roadAddress={marker.roadAddress}
                category={marker.category}
                x={marker.x}
                y={marker.y}
                isMarkerOpen={index === openMarkerIndex}
                onClick={() => {
                  if (openMarkerIndex === index) {
                    setOpenMarkerIndex(null);
                  } else {
                    setOpenMarkerIndex(index);
                  }
                }}
              />
            ))}
          {polygons.map((polygon, index) => (
            <SeoulPolygon
              key={index}
              nameEng={polygon.name_eng}
              path={polygon.path}
              point={options[polygon.name_eng].point}
              onPolygonClick={() => {
                handlePolygonClick(polygon.path);
              }}
            />
          ))}

          {/* 현재위치로 가는 아이콘 */}
          {currentLocation && (
            <CurrentLocationButton onClick={handleCurrentLocationClick} />
          )}

          {/* 현재 위치 마커 */}
          {zoomLevel >= 14 && currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: currentLocationIconUrl,
                scaledSize: new google.maps.Size(30, 30),
              }}
            />
          )}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default Map;
