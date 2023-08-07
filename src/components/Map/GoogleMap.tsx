/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";

import seoulData from "../../data/seoul2.json";
import retroMapStyle from "../../data/retroMapStyle.json";
import { defaultCenter, bounds, options } from "../../data/mapData";

import SeoulPolygon from "./SeoulPolygon";
import BlackPolygon from "./BlackPolygon";
import CustomMarker from "./CustomMarker";

// Marker 데이터 인터페이스 정의
interface MarkerData {
  position: google.maps.LatLngLiteral;
  title: string;
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
  const [polygons, setPolygons] = useState<
    {
      name: string;
      name_eng: string;
      path: { lat: number; lng: number }[];
      options: {};
    }[]
  >([]);

  const [view, setView] = useState({ center: defaultCenter, zoom: 10 });

  // 지도의 인스턴스를 참조하기 위한 ref 생성
  const mapRef = useRef<google.maps.Map | null>(null);

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // 현재의 확대 레벨을 추적하는 상태
  const [zoomLevel, setZoomLevel] = useState(11);

  // 마커 데이터 상태 관리
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  function getCentroid(coords: any[]) {
    let center = coords.reduce(
      (x, y) => {
        return [x[0] + y.lng / coords.length, x[1] + y.lat / coords.length];
      },
      [0, 0]
    );
    return { lat: center[1], lng: center[0] };
  }

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

  // 음식점 검색 및 마커 데이터 업데이트 함수
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&x=${defaultCenter.lng}&y=${defaultCenter.lat}&radius=2000`, // 음식점 카테고리 코드와 반경 2키로 이내 설정
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // API에서 받아온 데이터를 기반으로 마커 데이터 생성
        const newMarkers: MarkerData[] = data.documents.map(
          (document: any) => ({
            position: {
              lat: parseFloat(document.y),
              lng: parseFloat(document.x),
            },
            title: document.place_name,
          })
        );
        // 마커 데이터 업데이트
        setMarkers(newMarkers);
      } else {
        console.error("API 호출 중 오류 발생");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    if (view.center && mapRef.current) {
      setMapCenter(view.center);
      mapRef.current.setZoom(view.zoom);
    }
  }, [view]);

  useEffect(() => {
    const data = seoulData.features.map((feature) => {
      const name = feature.properties.name;
      const name_eng = feature.properties.NAME_1;
      const path = feature.geometry.coordinates[0][0].map(([lng, lat]) => ({
        lat,
        lng,
      }));

      return { name, name_eng, path, options: {} };
    });

    if (zoomLevel < 14) {
      setPolygons(data);
    } else {
      setPolygons([]); // 확대 레벨이 14 이상이면 색상이 있는 폴리곤을 숨깁니다.
    }

    return () => setPolygons([]);
  }, [zoomLevel]);

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 음식점 검색 및 마커 업데이트 실행
    handleSearch();
  }, []);

  return (
    <div
      css={{
        position: "relative",
        width: "100%",
        height: "100%",
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
            minZoom: 10,
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
            const newZoomLevel = mapRef.current?.getZoom() || 11;
            setZoomLevel(newZoomLevel);
          }}
        >
          <BlackPolygon />
          {/* 마커 렌더링 */}
          {zoomLevel >= 14 &&
            markers.map((marker, index) => (
              <CustomMarker key={index} position={marker.position} />
            ))}
          {polygons.map((polygon, index) => (
            <SeoulPolygon
              key={index}
              nameEng={polygon.name_eng}
              path={polygon.path}
              point={options[polygon.name_eng].point}
              onPolygonClick={() => {
                const center = getCentroid(polygon.path);
                setView({ center, zoom: 16 });
              }}
            />
          ))}
          {/* 현재위치로 가는 아이콘 */}
          <div
            css={{
              position: "absolute",
              bottom: "115px",
              right: "0px",
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={handleCurrentLocationClick}
          >
            <img
              src="/images/map/currentLocation.png"
              width="57px"
              height="57px"
              alt="현재 위치로 이동"
            />
          </div>
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default Map;
