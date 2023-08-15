/** @jsxImportSource @emotion/react */
import colors from "../../constants/colors";

interface PlaceTitleProps {
  icon: string;
  name: string;
  category: string;
  roadAddress: string;
}

const PlaceTitle = ({ icon, name, category, roadAddress }: PlaceTitleProps) => {
  // 글자 수가 16자 이상인 경우에는 줄이고 '...'을 붙임
  const truncatedName = name.length > 16 ? name.slice(0, 16) + "..." : name;

  // 카테고리에 따라 아이콘을 다르게 설정
  let categoryIcon;

  // 변환된 카테고리 이름을 저장할 변수 추가
  let displayCategory;

  switch (category) {
    case "역사":
      categoryIcon = "/images/certificationModal/historyIcon.png";
      displayCategory = "역사";
      break;
    case "맛집":
      categoryIcon = "/images/certificationModal/restaurantIcon.png";
      displayCategory = "미식";
      break;
    case "스포츠시설":
      categoryIcon = "/images/certificationModal/healthIcon.png";
      displayCategory = "운동";
      break;
    case "미술관":
      categoryIcon = "/images/certificationModal/artIcon.png";
      displayCategory = "미술관";
      break;
    case "커피":
      categoryIcon = "/images/certificationModal/coffeeIcon.png";
      displayCategory = "커피";
      break;
    default:
      categoryIcon = ""; // 디폴트 아이콘 경로 설정
      displayCategory = category; // 변환 없음
  }

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
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
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
            gap: 5,
          }}
        >
          <img src={categoryIcon} alt="categoryIcon" width={16} height={16} />
          {displayCategory}
        </div>
        <div css={{ color: colors.lightGrey, fontWeight: "bold" }}>
          {roadAddress}
        </div>
      </div>
    </div>
  );
};

export default PlaceTitle;
