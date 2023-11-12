/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useConfirmModal from "../../hooks/useConfirmModal";
import colors from "../../constants/colors";
import Button from "./Button";
import { IModal } from "../../types/types";

const ConfirmModal = ({
  title,
  content,
  onConfirmHandler,
  confirmText = "확인",
}: IModal) => {
  const { closeModal } = useConfirmModal();

  const closeModalHandler = () => {
    closeModal();
  };

  return (
    <Layout>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Footer>
        <CancleButton onClick={closeModalHandler}>취소</CancleButton>
        <ConfirmButton onClick={onConfirmHandler}>{confirmText}</ConfirmButton>
      </Footer>
    </Layout>
  );
};

export default ConfirmModal;

const Layout = styled.div`
  position: absolute;
  bottom: 50vh;
  left: 50%;
  transform: translate(-50%);
  width: 90%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 24px 20px;
  background-color: #fff;
  border-radius: 12px;
`;

const Title = styled.h1`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const Content = styled.p`
  height: 100%;
  color: ${colors.darkGrey};
  font-size: 14px;
  margin: 4px 0;
`;

const ButtonStyle = css`
  width: 150px;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  border: none;
`;
const CancleButton = styled(Button)`
  ${ButtonStyle};
  background-color: ${colors.paleGrey};
  color: ${colors.mediumGrey};

  &:hover {
    background-color: ${colors.lightGrey};
  }
`;
const ConfirmButton = styled(Button)`
  ${ButtonStyle};
  color: #fff;
`;
export const Footer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
`;
