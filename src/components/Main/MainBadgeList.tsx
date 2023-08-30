/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getMyBadge } from "../../api/user";

export interface BadgeData {
  badge_name: string;
  badge_image_url: string;
}

interface Badge {
  imageUrl: string;
  badgeName: string;
}

interface MainBadgeListProps {
  badges: Badge[];
}

const MainBadgeList: React.FC<MainBadgeListProps> = ({ badges }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getMyBadge().then((badgeData: BadgeData) => {
      console.log(badgeData);
    });
  });

  return (
    <div onClick={() => navigate("/badgeList")}>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          color: "#53AF7B",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        <img
          src="/images/main/badgeIcon.png"
          alt="뱃지 아이콘"
          css={{ width: 18, height: 22, marginRight: 5 }}
        />
        뱃지
      </div>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 10,
          marginTop: 10,
        }}
      >
        {badges.slice(0, 5).map((badge, index) => (
          <img
            key={index}
            src={badge.imageUrl}
            alt={badge.badgeName}
            css={{ width: 56, aspectRatio: 1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBadgeList;
