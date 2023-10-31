/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import colors from "../../constants/colors";

interface BadgeToggleButtonProps {
  showAllBadges: boolean;
  handleToggleClick: () => void;
}

const BadgeToggleButton = ({
  showAllBadges,
  handleToggleClick,
}: BadgeToggleButtonProps) => {
  return (
    <ToggleButtonContainer
      showAllBadges={showAllBadges}
      onClick={handleToggleClick}
    >
      <ToggleButton showAllBadges={showAllBadges} />
    </ToggleButtonContainer>
  );
};

export default BadgeToggleButton;

const ToggleButtonContainer = styled.div<{ showAllBadges: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 3.5rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.showAllBadges ? "#D1D5DB" : colors.primary};
  padding: 0.25rem;
  cursor: pointer;
`;

const ToggleButton = styled.div<{ showAllBadges: boolean }>`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
  transform: ${(props) =>
    props.showAllBadges ? "translateX(1.5rem)" : "translateX(0)"};
`;
