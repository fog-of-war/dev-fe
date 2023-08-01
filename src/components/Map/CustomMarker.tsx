/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position }) => {
  const [isClicked, setIsClicked] = useState(false);

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
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} // 마우스 이벤트를 허용하기 위해 오버레이를 마커 위로 배치합니다.
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
              },
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
              <span
                css={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#E5A602",
                }}
              >
                숭례문
              </span>
              <br />
              <span
                css={{
                  color: "#CEB268",
                }}
              >
                서울특별시 중구 세종대로 40
              </span>
            </div>
          </div>
        </OverlayView>
      )}
    </>
  );
};

export default CustomMarker;
