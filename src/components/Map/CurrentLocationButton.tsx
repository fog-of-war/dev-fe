import React from "react";

interface CurrentLocationButtonProps {
  onClick: () => void;
}

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  onClick,
}) => {
  console.log("tlqkf");

  return (
    <div>
      <img
        src="./currentLocation.png"
        width="57px"
        height="57px"
        css={{
          position: "absolute",
          bottom: "110px",
          right: "0px",
          zIndex: 1,
          cursor: "pointer",
        }}
        alt="현재 위치로 이동"
        onClick={onClick}
      />
    </div>
  );
};

export default CurrentLocationButton;
