/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import { Badges, UserBadge } from "../../types/types";

interface BadgeItemProps {
  badge: Badges;
  myBadges?: UserBadge[];
}

type BadgeColors = {
  [key: string | number]: {
    background: string;
    border: string;
  };
};

export const badgeColors: BadgeColors = {
  미획득: {
    background: "#d9d9d9",
    border: "#aaaaaa",
  },
  1: {
    background: "#ddfcea",
    border: colors.primary,
  },
  2: {
    background: "#ffe7e7",
    border: "#ff8585",
  },
  3: {
    background: "#e7f6ff",
    border: "#448cf8",
  },
  4: {
    background: "#fcf4ff",
    border: "#a67cff",
  },
  5: {
    background: "#fffaee",
    border: "#e5a602",
  },
  6: {
    background: "#fff0ea",
    border: "#995312",
  },
};

const BadgeItem = ({ badge, myBadges }: BadgeItemProps) => {
  const hasAcquiredBadge = myBadges?.some(
    (myBadge) => myBadge.badge_id === badge.badge_id
  );

  const badgeColor = hasAcquiredBadge
    ? badgeColors[badge.badge_category_id]
    : badgeColors["미획득"];

  let badgeCategory;

  switch (badge.badge_category_id) {
    case 1:
      badgeCategory = "장소";
      break;
    case 2:
      badgeCategory = "미식";
      break;
    case 3:
      badgeCategory = "운동";
      break;
    case 4:
      badgeCategory = "예술";
      break;
    case 5:
      badgeCategory = "역사";
      break;
    case 6:
      badgeCategory = "커피";
      break;
    default:
      badgeCategory = "기본 칭호";
      break;
  }

  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "83px",
          height: "83px",
          borderRadius: "100%",
          backgroundColor: badgeColor.background,
          opacity: hasAcquiredBadge ? 1 : 0.5,
        }}
      >
        <img
          src={badge.badge_image_url}
          alt={`${badge.badge_name}`}
          css={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            filter: hasAcquiredBadge ? "none" : "grayscale(100%)",
          }}
        />
      </div>
      <span
        css={{
          color: badgeColor.border,
          fontSize: "14px",
          fontWeight: "600",
          marginTop: "5px",
        }}
      >
        {badge.badge_name}
      </span>
      <span
        css={{
          fontSize: "14px",
          color: "#6f6f6f",
        }}
      >
        {`${badgeCategory} ${badge.badge_criteria}개`}
      </span>
    </div>
  );
};

export default BadgeItem;
