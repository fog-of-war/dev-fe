import React, { useEffect } from "react";
import seoulData from "../src/data/seoul.json";

const KakaoMap = () => {
  let polygons: any = new Map();

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map")!;
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        let districtData: { [key: string]: { lat: number; lng: number }[] } =
          {};

        seoulData.features.forEach((feature: any) => {
          let districtName = feature.properties.name;
          let coords = feature.geometry.coordinates[0];

          let formattedCoords = coords.map((coordPair: number[]) => {
            return { lat: coordPair[1], lng: coordPair[0] };
          });

          districtData[districtName] = formattedCoords;
        });

        function displayDistrict(
          map: any,
          name: string,
          pathData: { lat: number; lng: number }[]
        ) {
          var path = pathData.map(
            (coords) => new window.kakao.maps.LatLng(coords.lat, coords.lng)
          );

          var polygon = new window.kakao.maps.Polygon({
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            fillColor: "#000000",
            fillOpacity: 0.8,
          });
          polygon.setMap(map);

          var content =
            '<div class="info">' +
            '   <div class="title">' +
            name +
            "</div>" +
            '   <div class="size">총 면적 : 약 ' +
            Math.floor(polygon.getArea()) +
            " m<sup>2</sup></div>" +
            "</div>";

          var infowindow = new window.kakao.maps.InfoWindow({
            position: path[0],
            content: content,
          });

          var customOverlay = new window.kakao.maps.CustomOverlay({
            position: path[0],
            content: '<div class="area">' + name + "</div>",
          });

          window.kakao.maps.event.addListener(
            polygon,
            "mouseover",
            function (mouseEvent: { latLng: any }) {
              polygon.setOptions({ fillColor: "#09f" });
              customOverlay.setPosition(mouseEvent.latLng);
              customOverlay.setMap(map);
            }
          );

          window.kakao.maps.event.addListener(
            polygon,
            "mousemove",
            function (mouseEvent: { latLng: any }) {
              customOverlay.setPosition(mouseEvent.latLng);
            }
          );

          window.kakao.maps.event.addListener(polygon, "mouseout", function () {
            polygon.setOptions({ fillColor: "#000000" });
            customOverlay.setMap(null);
            infowindow.close();
          });

          window.kakao.maps.event.addListener(
            polygon,
            "click",
            function (mouseEvent: { latLng: any }) {
              infowindow.setPosition(mouseEvent.latLng);
              infowindow.open(map);
            }
          );
        }

        Object.entries(districtData).forEach(([name, pathData]) => {
          displayDistrict(
            map,
            name,
            pathData as { lat: number; lng: number }[]
          );
        });

        function changeColor(name: string, color: string) {
          const polygon = polygons.get(name);

          if (polygon) {
            polygon.setOptions({
              fillColor: color,
            });
          }
        }

        if (true) {
          changeColor("중구", "#09f");
        }
      });
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default KakaoMap;
