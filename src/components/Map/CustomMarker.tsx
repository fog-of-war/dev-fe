/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
  placeName: string;
  roadAddress: string;
  category: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  placeName,
  roadAddress,
  category,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const overlayPixelOffset = { x: -125, y: -120 }; // 오버레이를 마커 오프셋 설정

  // placeName이 8글자 이상인 경우 자르고 '...'을 추가
  const truncatedPlaceName =
    placeName.length > 8 ? `${placeName.slice(0, 8)}...` : placeName;

  // 카테고리에 따른 스타일 및 아이콘 설정
  let overlayBackgroundColor = "#E4F6ED";
  let borderTopColor = "#E4F6ED";
  let placeNameColor = "#11522D";
  let roadAddressColor = "#B5DCC6";
  let iconSrc = "/images/map/BasicIcon.png";

  // 역사 카테고리
  if (category === "역사") {
    overlayBackgroundColor = "#FFFAEE";
    borderTopColor = "#FFFAEE";
    placeNameColor = "#E5A602";
    roadAddressColor = "#CEB268";
    iconSrc = "/images/map/historyIcon.png";
  }

  // 맛집 카테고리
  if (category === "맛집") {
    overlayBackgroundColor = "#FFF4F4";
    borderTopColor = "#FFF4F4";
    placeNameColor = "#FA5757";
    roadAddressColor = "#FF9494";
    iconSrc = "/images/map/restaurantIcon.png";
  }

  // 미술관 카테고리
  if (category === "미술관") {
    overlayBackgroundColor = "#FCF4FF";
    borderTopColor = "#FCF4FF";
    placeNameColor = "#7F43FF";
    roadAddressColor = "#B99BFB";
    iconSrc = "/images/map/artIcon.png";
  }

  // 커피 카테고리
  if (category === "커피") {
    overlayBackgroundColor = "#FFF8F5";
    borderTopColor = "#FFF8F5";
    placeNameColor = "#995312";
    roadAddressColor = "#D69B64";
    iconSrc = "/images/map/cafeIcon.png";
  }

  // 헬스 카테고리
  if (category === "헬스") {
    overlayBackgroundColor = "#E7F6FF";
    borderTopColor = "#E7F6FF";
    placeNameColor = "#2C7DF5";
    roadAddressColor = "#78ADFE";
    iconSrc = "/images/map/healthIcon.png";
  }

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
              backgroundColor: overlayBackgroundColor,
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
                borderTop: `10px solid ${borderTopColor}`,
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
                src={iconSrc}
                alt="Circular Icon"
                css={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <span
                css={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: placeNameColor,
                }}
              >
                {truncatedPlaceName}
              </span>
              <br />
              <span
                css={{
                  color: roadAddressColor,
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
