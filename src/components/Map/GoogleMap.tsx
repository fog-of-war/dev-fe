/** @jsxImportSource @emotion/react */
import { useEffect, useContext } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import retroMapStyle from "../../data/retroMapStyle.json";
import { bounds, options } from "../../data/mapData";
import { Place } from "../../types/types";
import { MapContext } from "../../context/MapContext";
import usePolygon from "../../hooks/map/usePolygon";
import useMapMarker from "../../hooks/map/useMapMarker";
import useMapGlobalState from "../../hooks/map/useMapGlobalState";
import useCurrentLocation from "../../hooks/map/useCurrentLocation";

import SeoulPolygon from "./SeoulPolygon";
import OutsidePolygon from "./OutsidePolygon";
import CustomMarker from "./CustomMarker";
import CurrentLocationButton from "./CurrentLocationButton";

// 현재 위치 마커 아이콘 이미지 URL
const CURRENT_LOCATION_ICON = "/images/map/humanIcon.png";

// 컨테이너 크기 정의
const CONTAINER_STYLE = {
  width: "100%",
  height: "100%",
};

interface MapProps {
  places?: Place[];
}

const Map = ({ places }: MapProps) => {
  const { map, mapRef, selectedPlace, setSelectedPlace, setMap } =
    useContext(MapContext);

  console.log(places);

  // 마커 관련 로직을 관리하는 커스텀 훅
  const { markers, openMarkerName, setOpenMarkerName, handleMarkerClick } =
    useMapMarker(places, mapRef);

  // 지도 View 전역 상태 로직을 관리하는 커스텀 훅
  const { center, zoom, handleZoomChange, handleMapChange } =
    useMapGlobalState(mapRef);

  // 현재 위치 기반 로직을 관리하는 커스텀 훅
  const { currentLocation, isInSeoul, handleCurrentLocationClick } =
    useCurrentLocation();

  // 폴리곤 기반 로직을 관리하는 커스텀 훅
  const { polygons, handlePolygonClick, updateVisitedRegions } = usePolygon(
    zoom,
    map
  );

  useEffect(() => {
    if (selectedPlace) {
      map?.panTo({ lat: +selectedPlace.y, lng: +selectedPlace.x });
      map?.setZoom(18);
    }

    setTimeout(() => {
      setSelectedPlace(null);
    }, 1000);
  }, [selectedPlace, map]);

  // 내가 방문한 지역 정보를 가져오고 options 객체를 업데이트합니다.
  useEffect(() => {
    updateVisitedRegions();
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
          mapContainerStyle={CONTAINER_STYLE}
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
                naverPlaceUrl={marker.naverPlaceUrl}
                placeUrl={marker.placeUrl}
                placePosts={marker.placePosts}
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
                url: CURRENT_LOCATION_ICON,
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
