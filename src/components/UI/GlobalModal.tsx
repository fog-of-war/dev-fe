/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import useConfirmModal from "../../hooks/useConfirmModal";
import { MODAL_TYPES } from "../../types/types.d";
import ConfirmModal from "./ConfirmModal";

const GlobalModal = () => {
  const { closeModal, modalOpen, modalType, modalProps } = useConfirmModal();

  const closeModalHandler = () => {
    closeModal();
  };

  const renderComponent = () => {
    if (!modalType) {
      return null;
    }

    const ModalComponent = MODAL_COMPONENTS[modalType];

    return (
      <>
        {modalOpen && (
          <>
            <BackDrop onClick={closeModalHandler} />
            <ModalFloat>
              <ModalComponent {...modalProps} />
            </ModalFloat>
          </>
        )}
      </>
    );
  };

  return <>{renderComponent()}</>;
};

export default GlobalModal;

const MODAL_COMPONENTS = {
  [MODAL_TYPES.ALERT]: ConfirmModal,
};

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
`;
export const ModalFloat = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  z-index: 100;
`;
