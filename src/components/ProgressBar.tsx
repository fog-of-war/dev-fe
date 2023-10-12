/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../constants/colors";
import useProgressInfo from "../hooks/useProgressInfo";

export interface ProgressBarProps {
  progress?: number;
  level: number;
  userPoints: number;
}

const ProgressBar = ({ level, userPoints }: ProgressBarProps) => {
  const { calculatePoints, calculateProgress } = useProgressInfo();
  const [animate, setAnimate] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);

  const requiredPoints = calculatePoints(level, userPoints);
  const progressPercentage = calculateProgress(level, userPoints);

  useEffect(() => {
    if (localProgress !== progressPercentage && localProgress !== 0) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
    setLocalProgress(progressPercentage);
  }, [progressPercentage, localProgress]);

  return (
    <ProgressBarContainer>
      <ProgressText>
        {requiredPoints > 0
          ? `다음 레벨업까지 ${requiredPoints.toLocaleString()} 포인트`
          : "최고 레벨에 도달했습니다!"}
      </ProgressText>
      <StyledProgressBar progress={progressPercentage} animate={animate} />
      <LevelText left>{level} Lv</LevelText>
      <LevelText right>{level + 1} Lv</LevelText>
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  margin-top: 20px;
`;

const StyledProgressBar = styled.div<{ progress: number; animate: boolean }>`
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
    animation: ${({ animate }) =>
      animate ? "ProgressBarfillAnimation 1s ease-out" : "none"};
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
