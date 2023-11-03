/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import colors from "../../constants/colors";

interface ModalProps {
  children: React.ReactNode;
}

const ProfileActionModal = ({ children }: ModalProps) => {
  return <ModalLayout>{children}</ModalLayout>;
};

export default ProfileActionModal;

const ModalLayout = styled.div`
  position: absolute;
  width: 120px;
  z-index: 2;
  top: 30px;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.paleGrey};
`;
