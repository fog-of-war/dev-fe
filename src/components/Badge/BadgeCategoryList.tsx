/** @jsxImportSource @emotion/react */

import BadgeItem from "./BadgeItem";
import { BadgeListProps } from "../../types/types";

interface BadgeCategoryListProps extends BadgeListProps {
  category: {
    id: number;
    name: string;
    bgColor: string;
    aquiredColor: string;
    fontColor: string;
    aquiredFontColor: string;
  };
}

const BadgeCategoryList = ({
  allBadges,
  myBadges,
  showAllBadges,
  category,
}: BadgeCategoryListProps) => {
  const checkAquiredBadgeCategory = (): boolean => {
    return (
      myBadges?.some((badge) => badge.badge_category_id === category.id) ||
      false
    );
  };

  const hasCategory = checkAquiredBadgeCategory();

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        width: "100%",
        padding: "1rem",
        backgroundColor: hasCategory ? category.aquiredColor : category.bgColor,
      }}
    >
      <span
        css={{
          color: hasCategory ? category.aquiredFontColor : category.fontColor,
          fontSize: "18px",
          fontWeight: "bold",
          gridColumn: "1/4",
          textAlign: "center",
        }}
      >
        {category.name}
      </span>
      {!showAllBadges && !hasCategory ? (
        <span
          css={{
            gridColumn: "1/4",
            textAlign: "center",
            color: "#808080",
            fontSize: "16px",
            fontWeight: "normal",
          }}
        >
          획득한 뱃지가 없습니다.
        </span>
      ) : (
        allBadges.map((badge) => (
          <BadgeItem key={badge.badge_id} badge={badge} myBadges={myBadges} />
        ))
      )}
    </div>
  );
};

export default BadgeCategoryList;
