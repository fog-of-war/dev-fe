/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isHoverColor?: boolean;
}

const Button = ({ children, onClick, isHoverColor }: ButtonProps) => {
  return (
    <StyledButton isHoverColor={isHoverColor} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  background-color: #53af7b;
  border: none;
  border-radius: 7px;
  color: #fff;
  width: 350px;
  height: 55px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
  ${(props) => props.isHoverColor && "&:hover { background-color: #11522D; }"}
`;
