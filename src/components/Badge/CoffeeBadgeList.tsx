/** @jsxImportSource @emotion/react */

import BadgeItem from "./BadgeItem";
import { BadgeListProps } from "../../types/types";

const CoffeeBadgeList = ({ badges }: BadgeListProps) => {
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
          backgroundColor: hasAcquiredBadge ? "#fff9f6" : "#f5f5f5",
        }}
      >
        <span
          css={{
            color: hasAcquiredBadge ? "#995312" : "#808080",
            fontSize: "18px",
            fontWeight: "bold",
            gridColumn: "1/4",
            textAlign: "center",
          }}
        >
          커피
        </span>
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </>
  );
};

export default CoffeeBadgeList;
