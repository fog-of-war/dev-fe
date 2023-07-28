/** @jsxImportSource @emotion/react */

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
  const medalIcon =
    index === 0
      ? "/images/goldMedal.png"
      : index === 1
      ? "/images/silverMedal.png"
      : "/images/bronzeMedal.png";

  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: 1,
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
          paddingTop: "100%",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt="숭례문"
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
          }}
        >
          {district}
        </h3>
      </div>
    </div>
  );
};

export default MyRankingItem;
