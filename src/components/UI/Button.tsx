/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import colors from "../../constants/colors";
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
  background-color: ${colors.primary};
  border: none;
  border-radius: 10px;
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
  ${(props) =>
    props.isHoverColor && `&:hover { background-color: ${colors.secondary}; }`}
`;
