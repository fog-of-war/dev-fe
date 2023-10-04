/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBadgeData from "../../hooks/useBadgeData";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/UI/Button";
import { GetBadgePageLayout } from "../../styles/styles";
import { Badges } from "../../types/types";
import { badgeColors } from "../../components/Badge/BadgeItem";

const GetBadgePage = () => {
  const navigate = useNavigate();

  const { allBadges } = useBadgeData();

  const { data: userData } = useAuth();

  const [acquiredBadge, setAcquiredBadge] = useState<Badges | null>(null);

  const badgeColor = badgeColors[acquiredBadge?.badge_category_id || "미획득"];

  let badgeCategory;

  switch (acquiredBadge?.badge_category_id) {
    case 1:
      badgeCategory = "기본 칭호";
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

  useEffect(() => {
    const acquiredBadgeIds =
      userData?.user_badges.map((badge) => badge.badge_id) || [];

    const newlyAcquiredBadge = allBadges.find(
      (badge) => !acquiredBadgeIds.includes(badge.badge_id)
    );

    if (newlyAcquiredBadge) {
      setAcquiredBadge(newlyAcquiredBadge);
    }
  }, [allBadges, userData]);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <GetBadgePageLayout>
      {acquiredBadge && (
        <>
          <div></div>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "165px",
                height: "165px",
                borderRadius: "100%",
                border: `10px solid ${badgeColor.border}`,
                backgroundColor: badgeColor.background,
              }}
            >
              <img
                css={{
                  width: "85px",
                  height: "85px",
                  overflow: "hidden",
                }}
                src={acquiredBadge.badge_image_url}
                alt={acquiredBadge.badge_name}
              />
            </div>
            <span
              css={{
                fontSize: "26px",
                fontWeight: "bold",
                color: badgeColor.border,
                paddingTop: "10px",
              }}
            >
              {acquiredBadge.badge_name} 뱃지 획득!
            </span>
            <span
              css={{
                fontSize: "20px",
                fontWeight: "400",
                color: "#6f6f6f",
                display: "block",
              }}
            >
              {`${badgeCategory} ${acquiredBadge.badge_criteria}개 달성완료!`}
            </span>
          </div>
        </>
      )}
      <Button
        css={{ width: "100%", height: "55px" }}
        size="large"
        onClick={handleBackClick}
      >
        닫기
      </Button>
    </GetBadgePageLayout>
  );
};

export default GetBadgePage;
