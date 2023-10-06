/** @jsxImportSource @emotion/react */

import { useState } from "react";
import useBadgeData from "../../hooks/useBadgeData";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import BadgePageHeader from "../../components/Badge/BadgePageHeader";
import Button from "../../components/UI/Button";
import colors from "../../constants/colors";
import { Badges } from "../../types/types";
import BadgeCategoryList from "../../components/Badge/BadgeCategoryList";
import { BADGE_CATEGORIES } from "../../constants/badgeCategory";

const BadgeListPage = () => {
  const [showAllBadges, setShowAllBadges] = useState<boolean>(true);
  const { allBadges } = useBadgeData();
  const { data: userData } = useAuth();

  const filterdBadges = (badges: Badges[]) => {
    if (showAllBadges) {
      return badges;
    }

    return badges.filter((badge) => {
      return userData?.user_badges.some(
        (userBadge) => userBadge.badge_id === badge.badge_id
      );
    });
  };

  const handleToggleClick = () => {
    setShowAllBadges((prevState) => !prevState);
  };

  const acquiredBadgesCount = userData?.user_badges.length;

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "30px",
        paddingTop: "40px",
      }}
    >
      <BadgePageHeader
        showAllBadges={showAllBadges}
        handleToggleClick={handleToggleClick}
        acquiredBadgesCount={acquiredBadgesCount}
      />
      {BADGE_CATEGORIES.map((category) => {
        const categoryBadges = allBadges.filter(
          (badge) => badge.badge_category_id === category.id
        );

        return (
          <BadgeCategoryList
            allBadges={filterdBadges(categoryBadges)}
            myBadges={userData?.user_badges}
            showAllBadges={showAllBadges}
            category={category}
          />
        );
      })}
      {!showAllBadges && (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            height: "100%",
          }}
        >
          <span
            css={{
              fontSize: "20px",
              fontWeight: "bold",
              color: colors.primary,
            }}
          >
            목표를 달성하여 뱃지를 획득해보세요!
          </span>
          <Link
            to="/map"
            css={{
              textDecoration: "none",
            }}
          >
            <Button onClick={() => {}}>
              <span
                css={{
                  fontSize: "18px",
                  padding: "10px",
                }}
              >
                목표 달성하러 가기
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BadgeListPage;
