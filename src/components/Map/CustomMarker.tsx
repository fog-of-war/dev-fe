/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
  placeName: string;
  roadAddress: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  placeName,
  roadAddress,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const overlayPixelOffset = { x: -125, y: -120 }; // 오버레이를 마커 오프셋 설정

  return (
    <>
      <Marker
        position={position}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      />
      {isClicked && (
        <OverlayView
          position={position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={() => overlayPixelOffset}
        >
          <div
            css={{
              width: "250px",
              height: "70px",
              backgroundColor: "#FFFAEE",
              padding: "12px",
              borderRadius: "40px",
              boxShadow: "2px 3px 7px rgba(0, 0, 0, 0.25)",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              position: "relative",
              "::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                width: "0",
                height: "0",
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "10px solid #FFFAEE",
                transform: "translateX(-50%)",
              },
            }}
          >
            <div
              css={{
                width: "50px",
                height: "50px",
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
              <span
                css={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#E5A602",
                }}
              >
                {placeName}
              </span>
              <br />
              <span
                css={{
                  color: "#CEB268",
                }}
              >
                {roadAddress}
              </span>
            </div>
          </div>
        </OverlayView>
      )}
    </>
  );
};

export default CustomMarker;
