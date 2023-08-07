/** @jsxImportSource @emotion/react */

import React from "react";
import styled from "@emotion/styled";
import colors from "../../constants/colors";

interface ReviewEditButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  buttonType: "edit" | "delete";
}

const ReviewEditButton = ({
  children,
  onClick,
  buttonType = "edit",
}: ReviewEditButtonProps) => {
  return (
    <StyledButton buttonType={buttonType} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default ReviewEditButton;

const StyledButton = styled.button<{ buttonType: "edit" | "delete" }>`
  ${({ buttonType }) => `
    background-color: ${buttonType === "edit" ? colors.primary : "white"};
    border: ${buttonType === "edit" ? "none" : `1px solid ${colors.primary}`};
    border-radius: 5px;
    color: ${buttonType === "edit" ? "#fff" : colors.primary};
    width: 45px;
    height: 27px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
  `}
`;
