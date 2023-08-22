/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import colors from "../constants/colors";

interface ProgressBarProps {
  progress: number;
  level: number;
}

const ProgressBar = ({ progress, level }: ProgressBarProps) => {
  return (
    <>
      <ProgressBarContainer>
        <ProgressText>다음 레벨업까지 1,500 포인트</ProgressText>
        <StyledProgressBar progress={progress} level={level} />
        <LevelText left>{level} Lv</LevelText>
        <LevelText right>{level + 1} Lv</LevelText>
      </ProgressBarContainer>
    </>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  margin-top: 20px;
`;

const StyledProgressBar = styled.div<ProgressBarProps>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #eee;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 3px;
  &::after {
    content: "";
    display: block;
    border-radius: 10px;
    width: ${({ progress }) => `${progress}%`};
    height: 100%;
    background: linear-gradient(
      90deg,
      hsl(148, 41%, 60%) 0%,
      hsl(148, 41%, 35%) 100%
    );
    animation: ProgressBarfillAnimation 1s ease-out;
  }

  @keyframes ProgressBarfillAnimation {
    from {
      width: 0;
    }
    to {
      width: ${({ progress }) => `${progress}%`};
    }
  }
`;

const ProgressText = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.primary};
  position: absolute;
  top: -20px;
  left: 0;
  right: 0px;
  padding-left: 5px;
`;

const LevelText = styled.span<{ left?: boolean; right?: boolean }>`
  position: absolute;
  bottom: -20px;
  font-size: 12px;
  font-weight: bold;
  color: ${colors.primary};
  ${(props) =>
    props.left &&
    `
    left: 0;
  `}
  ${(props) =>
    props.right &&
    `
    right: 0;
  `}
`;
