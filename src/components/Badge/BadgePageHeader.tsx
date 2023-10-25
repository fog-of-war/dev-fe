import styled from "@emotion/styled";
import colors from "../../constants/colors";
import BadgeToggleButton from "./BadgeToggleButton";

interface BadgePageHeaderProps {
  showAllBadges: boolean;
  handleToggleClick: () => void;
  acquiredBadgesCount?: number;
}

const BadgePageHeader = ({
  showAllBadges,
  handleToggleClick,
  acquiredBadgesCount,
}: BadgePageHeaderProps) => {
  return (
    <HeaderLayout>
      <HeaderLeftContainer>
        <BadgeIconContainer>
          <img src="/images/badgeIcon.svg" alt="badge_icon" />
        </BadgeIconContainer>
        <BadgeLabel>
          {showAllBadges
            ? "전체 뱃지 목록"
            : `획득한 뱃지 ${acquiredBadgesCount}개`}
        </BadgeLabel>
      </HeaderLeftContainer>
      <BadgeToggleButton
        showAllBadges={showAllBadges}
        handleToggleClick={handleToggleClick}
      />
    </HeaderLayout>
  );
};

export default BadgePageHeader;

const HeaderLayout = styled.div`
  display: flex;
  width: 100%;
  max-width: 420px;
  height: 50px;
  align-items: center;
  position: fixed;
  top: 45px;
  background-color: #ffffff;
  z-index: 1;
  padding: 0 20px;
  justify-content: space-between;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const BadgeIconContainer = styled.div`
  padding-top: 6px;

  img {
    width: 18px;
    height: 22px;
  }
`;

const BadgeLabel = styled.span`
  color: ${colors.primary};
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;
