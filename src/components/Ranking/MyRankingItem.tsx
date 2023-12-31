/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

interface MyRankingItemProps {
  index: number;
  image: string;
  ranking: number;
  district: string;
}

const MyRankingItem = ({
  index,
  image,
  ranking,
  district,
}: MyRankingItemProps) => {
  let medalIcon;

  switch (ranking) {
    case 1:
      medalIcon = "/images/goldMedal.png";
      break;
    case 2:
      medalIcon = "/images/silverMedal.png";
      break;
    case 3:
      medalIcon = "/images/bronzeMedal.png";
      break;
    default:
      break;
  }

  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={medalIcon}
        alt={medalIcon}
        css={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "32px",
          zIndex: 1,
        }}
      />
      <div
        css={{
          position: "relative",
          borderRadius: "9999px",
          overflow: "hidden",
          width: "85px",
          height: "85px",
        }}
      >
        <img
          src={image}
          alt="지역 이미지"
          css={{
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            objectFit: "cover",
            filter: "brightness(0.6)",
          }}
        />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            color: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: 20,
            fontWeight: "semibold",
          }}
        >
          {ranking}위
        </div>
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        <h3
          css={{
            fontSize: 16,
            fontWeight: "semibold",
            color: colors.secondary,
          }}
        >
          {district}
        </h3>
      </div>
    </div>
  );
};

export default MyRankingItem;
