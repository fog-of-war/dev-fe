/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  return (
    <>
      <Marker
        position={position}
        onClick={() => {
          setInfoWindowOpen(!infoWindowOpen);
        }}
      />
      {infoWindowOpen && (
        <InfoWindow
          position={position}
          onCloseClick={() => {
            setInfoWindowOpen(false);
          }}
        >
          <div
            css={{
              backgroundColor: "#F0C22E",
              padding: "8px",
              borderRadius: "40px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              css={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                overflow: "hidden",
                marginRight: "8px",
              }}
            >
              <img
                src="https://source.unsplash.com/random"
                alt="Circular Icon"
                css={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              숭례문
              <br />
              서울특별시 중구 세종대로 40
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default CustomMarker;
