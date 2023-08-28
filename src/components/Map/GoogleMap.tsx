/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect, useContext } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import retroMapStyle from "../../data/retroMapStyle.json";
import { bounds, options } from "../../data/mapData";
import { Place } from "../../types/types";
import { useRecoilValue } from "recoil";
import { selectedPlaceAtom } from "../../store/mapAtom";
import { toast } from "react-hot-toast";
import { MapContext } from "../../context/MapContext";

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

interface MapProps {
  places?: Place[];
}

const Map = ({ places }: MapProps) => {
  // 지도의 인스턴스를 참조하기 위한 ref 생성
  const mapRef = useRef<google.maps.Map | null>(null);
  const { map, setMap } = useContext(MapContext);
  // const [map, setMap] = useState<google.maps.Map | null>(null);

  const selectedPlace = useRecoilValue(selectedPlaceAtom);

  // 마커 데이터 상태 관리
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // 마커 클릭 시 정보창을 열기 위한 상태
  const [openMarkerName, setOpenMarkerName] = useState<string | null>(null);

  // 현재 위치 마커 아이콘 이미지 URL
  const currentLocationIconUrl = "/images/map/humanIcon.png";

  const {
    center,
    zoom,
    handleCurrentLocationClick,
    handlePolygonClick,
    handleZoomChange,
    handleMapChange,
    handleMarkerClick,
  } = useGoogleMap(mapRef, map);
  const { currentLocation, isInSeoul } = useCurrentLocation();
  const polygons = usePolygon(zoom);

  // Map 컴포넌트가 마운트되거나 places props가 변경되면 마커 데이터 업데이트
  useEffect(() => {
    if (places) {
      // places 데이터를 기반으로 markers 배열 생성
      const newMarkers = places.map((place) => ({
        position: {
          lat: +place.y,
          lng: +place.x,
        },
        placeName: place.place_name,
        roadAddress: place.road_address_name,
        category: place.category_name,
        x: +place.y,
        y: +place.x,
      }));
      setMarkers(newMarkers);
    }
  }, [places]);

  useEffect(() => {
    setOpenMarkerName(selectedPlace);
  }, [selectedPlace]);

  useEffect(() => {
    if (!currentLocation) {
      toast.loading("현재 위치를 불러오는 중입니다.");
    }

    if (currentLocation) {
      toast.dismiss();
    }
  }, [currentLocation]);

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
          center={center}
          zoom={zoom}
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
            setMap(map);
          }}
          onZoomChanged={handleZoomChange}
          onCenterChanged={handleMapChange}
        >
          {/* 서울 주변 폴리곤 */}
          <OutsidePolygon />
          {/* 마커 렌더링 */}
          {zoom >= 14 &&
            markers.map((marker, index) => (
              <CustomMarker
                key={index}
                position={marker.position}
                placeName={marker.placeName}
                roadAddress={marker.roadAddress}
                category={marker.category}
                x={marker.x}
                y={marker.y}
                isMarkerOpen={marker.placeName === openMarkerName}
                onClick={() => {
                  if (openMarkerName === marker.placeName) {
                    setOpenMarkerName(null);
                  } else {
                    setOpenMarkerName(marker.placeName);
                  }
                  handleMarkerClick(marker.position);
                }}
              />
            ))}
          {zoom <= 14 &&
            polygons.map((polygon, index) => (
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
          {isInSeoul && (
            <CurrentLocationButton onClick={handleCurrentLocationClick} />
          )}

          {/* 현재 위치 마커 */}
          {zoom >= 14 && currentLocation && (
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
