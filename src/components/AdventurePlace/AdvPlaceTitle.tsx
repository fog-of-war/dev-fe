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
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <div css={{ display: "flex", alignItems: "center", gap: 5 }}>
        <img
          src="./images/markerIcon.png"
          alt="markerIcon"
          width={16}
          height={23}
        />
        <p
          css={{
            fontSize: "20px",
            fontWeight: "bold",
            color: colors.secondary,
          }}
        >
          탐험한 장소
        </p>
      </div>
    </div>
  );
};

export default AdvPlaceTitle;
