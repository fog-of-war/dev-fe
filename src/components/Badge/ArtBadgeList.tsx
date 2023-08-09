/** @jsxImportSource @emotion/react */

import BadgeItem from "./BadgeItem";
import { BadgeListProps } from "../../types/types";

const ArtBadgeList = ({ badges }: BadgeListProps) => {
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
          backgroundColor: hasAcquiredBadge ? "#fefaff" : "#f5f5f5",
        }}
      >
        <span
          css={{
            color: hasAcquiredBadge ? "#7f43ff" : "#808080",
            fontSize: "18px",
            fontWeight: "bold",
            gridColumn: "1/4",
            textAlign: "center",
          }}
        >
          미술관
        </span>
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </>
  );
};

export default ArtBadgeList;