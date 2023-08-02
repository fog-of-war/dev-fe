/** @jsxImportSource @emotion/react */
import colors from "../../constants/colors";

const AdvPlaceTitle = () => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "end",
        gap: "5px",
        width: "100%",
      }}
    >
      <div css={{ display: "flex", alignItems: "center", gap: 5 }}>
        <img
          src="./images/markerIcon.png"
          alt="markerIcon"
          width={16}
          height={23}
        />
        <h1
          css={{
            fontSzie: "20px",
            color: colors.secondary,
          }}
        >
          탐험한 장소
        </h1>
      </div>
    </div>
  );
};

export default AdvPlaceTitle;
