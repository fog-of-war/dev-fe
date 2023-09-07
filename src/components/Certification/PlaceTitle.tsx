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

  // 역사 카테고리
  if (category.includes("역사")) {
    categoryIcon = "/images/certificationModal/historyIcon.png";
    displayCategory = "역사";
  }

  // 커피 카테고리
  if (category.includes("커피") || category.includes("카페")) {
    categoryIcon = "/images/certificationModal/coffeeIcon.png";
    displayCategory = "커피";
  }

  // 미식 카테고리
  if (
    (category.includes("미식") ||
      category.includes("음식") ||
      category.includes("맛집")) &&
    !category.includes("카페") &&
    !category.includes("커피")
  ) {
    categoryIcon = "/images/certificationModal/restaurantIcon.png";
    displayCategory = "미식";
  }

  // 운동 카테고리
  if (
    category.includes("운동") ||
    category.includes("스포츠") ||
    category.includes("헬스")
  ) {
    categoryIcon = "/images/certificationModal/healthIcon.png";
    displayCategory = "운동";
  }

  // 미술 카테고리
  if (category.includes("미술")) {
    categoryIcon = "/images/certificationModal/artIcon.png";
    displayCategory = "미술";
  }

  // 기타 카테고리
  if (!displayCategory) {
    categoryIcon = "/images/certificationModal/anotherIcon.png";
    displayCategory = "기타";
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
      <div
        css={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1
          css={{
            fontSize: "20px",
            color: colors.darkGrey,
          }}
        >
          {truncatedName}
        </h1>
        <div
          css={{
            display: "flex",
            color: colors.lightGrey,
            fontWeight: 600,
            marginLeft: "auto",
          }}
        >
          더보기
        </div>
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
