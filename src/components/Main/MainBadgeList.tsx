/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyBadge } from "../../api/user";

export interface BadgeData {
  user_badges: any;
  badge_name: string;
  badge_image_url: string;
}

const MainBadgeList: React.FC = () => {
  const navigate = useNavigate();

  // 유저 뱃지 데이터
  const [userBadges, setUserBadges] = useState<BadgeData[]>([]);

  // 유저 뱃지 데이터 불러오기
  useEffect(() => {
    getMyBadge().then((badgeData: BadgeData) => {
      setUserBadges(badgeData.user_badges);
    });
  }, []);

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
        {userBadges.slice(0, 5).map((badge, index) => (
          <img
            key={index}
            src={badge.badge_image_url}
            alt={badge.badge_name}
            css={{ width: 56, aspectRatio: 1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBadgeList;
