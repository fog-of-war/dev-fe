/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";
import CertificationModal from "../CertificationModal";

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
  placeName: string;
  roadAddress: string;
  category: string;
  onClick: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps & { isMarkerOpen: boolean }> = ({
  position,
  placeName,
  roadAddress,
  category,
  isMarkerOpen,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const overlayPixelOffset = { x: -125, y: -120 }; // 오버레이를 마커 오프셋 설정하기

  // placeName이 8글자 이상인 경우 자르고 '...'을 추가
  const truncatedPlaceName =
    placeName.length > 8 ? `${placeName.slice(0, 8)}...` : placeName;

  const handleOverlayClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalOpen(true); // OverlayView 클릭 시 모달 열기
  };

  // 오버레이를 닫는 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 모달 클릭 이벤트 전파 방지
  const handleModalClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setIsClicked(isMarkerOpen);
  }, [isMarkerOpen]);

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

  // 스포츠시설 카테고리
  if (category === "스포츠시설") {
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
          onClick();
        }}
      />
      {isClicked && (
        <OverlayView
          position={position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            css={{
              position: "absolute",
              transform: `translate(${overlayPixelOffset.x}px, ${overlayPixelOffset.y}px)`,
              width: "250px",
              height: "70px",
              backgroundColor: overlayBackgroundColor,
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
                borderTop: `10px solid ${borderTopColor}`,
                transform: "translateX(-50%)",
              },
            }}
            onClick={handleOverlayClick}
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
      {isModalOpen && (
        <div
          css={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 100,
          }}
          onClick={handleCloseModal} // 배경 클릭 시 모달 닫기
        >
          <div onClick={handleModalClick}>
            <CertificationModal
              placeName={placeName}
              category={category}
              roadAddress={roadAddress}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CustomMarker;
