/** @jsxImportSource @emotion/react */

interface CurrentLocationButtonProps {
  onClick: () => void;
}

const CurrentLocationButton = ({ onClick }: CurrentLocationButtonProps) => {
  return (
    <div
      css={{
        position: "absolute",
        bottom: "115px",
        right: "0px",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <img
        src="/images/map/currentLocation.png"
        width="57px"
        height="57px"
        alt="현재 위치로 이동"
      />
    </div>
  );
};

export default CurrentLocationButton;
