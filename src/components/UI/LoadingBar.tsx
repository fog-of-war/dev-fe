/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../../constants/colors";

interface LoadingBarProps {
  progress?: number;
  text?: string;
}

const LoadingBar = ({ text = "Loading..." }: LoadingBarProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // 100% 이상으로 증가하지 않도록 interval 해제
          return 100;
        }
        return prevProgress + 10; // 10%씩 증가
      });
    }, 100);

    return () => {
      clearInterval(interval); // 컴포넌트 unmount 시 interval 해제
    };
  }, []);

  return (
    <Backdrop>
      <LoadingModalContainer>
        <LoadingText>{text}</LoadingText>
        <StyledLoadingBar progress={progress} />
      </LoadingModalContainer>
    </Backdrop>
  );
};

export default LoadingBar;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const LoadingModalContainer = styled.div`
  position: relative;
  width: 350px;
  height: 20px;
`;

const StyledLoadingBar = styled.div<Pick<LoadingBarProps, "progress">>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #eee;
  overflow: hidden;
  position: relative;
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
    animation: LoadingBarFillAnimation 2s ease-in-out infinite;
  }

  @keyframes LoadingBarFillAnimation {
    0% {
      width: 0;
    }
    70% {
      width: 100%;
      opacity: 1;
    }
    100% {
      opacity: 1;
      width: 100%;
      background-color: ${colors.secondary};
    }
  }
`;

const LoadingText = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.primary};
  position: absolute;
  text-align: center;
  top: -30px;
  left: 0;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
`;
