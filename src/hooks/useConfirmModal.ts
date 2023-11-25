import { useRecoilState } from "recoil";
import {
  confirmModalState,
  ModalStateInterface,
} from "../store/confirmModalStroe";

const useConfirmModal = () => {
  const [modalState, setModalState] = useRecoilState(confirmModalState);

  const openModal = (props: Partial<ModalStateInterface>) => {
    setModalState({
      modalOpen: true,
      ...props,
    });
  };

  const closeModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      modalOpen: false,
    }));
  };

  return { openModal, closeModal, ...modalState };
};

export default useConfirmModal;
