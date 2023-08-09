/** @jsxImportSource @emotion/react */

import BadgeItem from "./BadgeItem";
import { BadgeListProps } from "../../types/types";

const BaseBadgeList = ({ badges }: BadgeListProps) => {
  const hasAcquiredBadge = badges.some((badge) => badge.isAcquired);

  return (
    <>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          width: "100%",
          padding: "1rem",
          backgroundColor: hasAcquiredBadge ? "#f1f8f4" : "#d1d1d1",
        }}
      >
        <span
          css={{
            color: hasAcquiredBadge ? "#138243" : "#808080",
            fontSize: "18px",
            fontWeight: "bold",
            gridColumn: "1/4",
            textAlign: "center",
          }}
        >
          기본 칭호
        </span>
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </>
  );
};

export default BaseBadgeList;
