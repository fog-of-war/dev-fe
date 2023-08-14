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
        alignItems: "end",
        gap: "5px",
      }}
    >
      <div css={{ display: "flex", alignItems: "center", gap: 5 }}>
        <img src={icon} alt="categoryIcon" width={16} height={20} />
        <h1
          css={{
            fontSize: "20px",
            color: colors.darkGrey,
          }}
        >
          {truncatedName}
        </h1>
      </div>
      <h2
        css={{
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.primary,
        }}
      >
        {category}
      </h2>
    </div>
  );
};

export default PlaceTitle;
