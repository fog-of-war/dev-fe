/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import { Badge } from "../../types/types";

interface BadgeItemProps {
  badge: Badge;
}

type BadgeColors = {
  [key: string]: {
    background: string;
    border: string;
  };
};

const badgeColors: BadgeColors = {
  미획득: {
    background: "#cacaca",
    border: "#a3a3a3",
  },
  "기본 칭호": {
    background: "#ddfcea",
    border: colors.primary,
  },
  미식: {
    background: "#ffe7e7",
    border: "#ff8585",
  },
  운동: {
    background: "#e7f6ff",
    border: "#448cf8",
  },
  미술관: {
    background: "#fcf4ff",
    border: "#a67cff",
  },
  역사: {
    background: "#fffaee",
    border: "#e5a602",
  },
  커피: {
    background: "#fff0ea",
    border: "#995312",
  },
};

const BadgeItem = ({ badge }: BadgeItemProps) => {
  const badgeColor = badge.isAcquired
    ? badgeColors[badge.category]
    : badgeColors["미획득"];

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
          border: `5px solid ${badgeColor.border}`,
          backgroundColor: badgeColor.background,
        }}
      >
        <img
          src={badge.imageUrl}
          alt={`${badge.name}`}
          css={{
            width: "50px",
            height: "50px",
            overflow: "hidden",
            filter: badge.isAcquired ? "none" : "grayscale(100%)",
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
        {badge.name}
      </span>
      <span
        css={{
          fontSize: "14px",
          color: "#6f6f6f",
        }}
      >
        {badge.description}
      </span>
    </div>
  );
};

export default BadgeItem;
