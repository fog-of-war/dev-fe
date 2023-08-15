/** @jsxImportSource @emotion/react */
import colors from "../../constants/colors";

interface PlaceTitleProps {
  icon: string;
  name: string;
  category: string;
}

const PlaceTitle = ({ icon, name, category }: PlaceTitleProps) => {
  // 글자 수가 16자 이상인 경우에는 줄이고 '...'을 붙임
  const truncatedName = name.length > 16 ? name.slice(0, 16) + "..." : name;

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "5px",
      }}
    >
      <div css={{ display: "flex", alignItems: "center", gap: 5 }}>
        {/* <img src={icon} alt="categoryIcon" width={16} height={20} /> */}
        <h1
          css={{
            fontSize: "20px",
            color: colors.darkGrey,
          }}
        >
          {truncatedName}
        </h1>
      </div>
      <div
        css={{
          flex: "1",
          minWidth: "70px",
          padding: "5px 10px",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.mediumGrey,
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        {category}
      </div>
    </div>
  );
};

export default PlaceTitle;
