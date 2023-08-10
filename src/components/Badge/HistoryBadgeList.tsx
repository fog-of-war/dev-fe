/** @jsxImportSource @emotion/react */

import BadgeItem from "./BadgeItem";
import { BadgeListProps } from "../../types/types";

const HistoryBadgeList = ({ badges, showAllBadges }: BadgeListProps) => {
  const hasAcquiredBadge = badges.some((badge) => badge.isAcquired);

  if (!showAllBadges && !hasAcquiredBadge) return null;

  return (
    <>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          width: "100%",
          padding: "1rem",
          backgroundColor: hasAcquiredBadge ? "#fffcf3" : "#f5f5f5",
        }}
      >
        <span
          css={{
            color: hasAcquiredBadge ? "#e5a602" : "#808080",
            fontSize: "18px",
            fontWeight: "bold",
            gridColumn: "1/4",
            textAlign: "center",
          }}
        >
          역사
        </span>
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </>
  );
};

export default HistoryBadgeList;
