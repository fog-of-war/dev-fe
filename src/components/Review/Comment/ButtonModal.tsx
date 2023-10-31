/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import colors from "../../../constants/colors";

interface ButtonModalProps {
  children: React.ReactNode;
}

const ButtonModal = ({ children }: ButtonModalProps) => {
  return <ModalLayout>{children}</ModalLayout>;
};

export default ButtonModal;

const ModalLayout = styled.div`
  width: 45px;
  height: 70px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  button:hover {
    background-color: ${colors.pastel};
  }
`;
