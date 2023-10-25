/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import useBadgeData from "../../hooks/useBadgeData";
import useAuth from "../../hooks/useAuth";
import { Link as RawLink } from "react-router-dom";
import BadgePageHeader from "../../components/Badge/BadgePageHeader";
import Button from "../../components/UI/Button";
import colors from "../../constants/colors";
import { Badges } from "../../types/types";
import BadgeCategoryList from "../../components/Badge/BadgeCategoryList";
import { BADGE_CATEGORIES } from "../../constants/badgeCategory";
import PageHeader from "../../components/UI/PageHeader";

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
    <>
      <PageHeader headerTitle="뱃지" />
      <BadgePageLayout>
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
          <BadgeAcquisitionContainer>
            <AcquisitionMessage>
              목표를 달성하여 뱃지를 획득해보세요!
            </AcquisitionMessage>
            <Link to="/map">
              <Button onClick={() => {}}>
                <ButtonContent>목표 달성하러 가기</ButtonContent>
              </Button>
            </Link>
          </BadgeAcquisitionContainer>
        )}
      </BadgePageLayout>
    </>
  );
};

export default BadgeListPage;

const BadgePageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
  padding-top: 90px;
`;

const BadgeAcquisitionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const AcquisitionMessage = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.primary};
`;

const Link = styled(RawLink)`
  text-decoration: none;
`;

const ButtonContent = styled.span`
  font-size: 18px;
  padding: 10px;
`;
