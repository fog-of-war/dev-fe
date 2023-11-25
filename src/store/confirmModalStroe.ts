import { atom } from "recoil";
import { IModal, ModalType, MODAL_TYPES } from "../types/types.d";

export interface ModalStateInterface {
  modalType?: ModalType;
  modalOpen: boolean;
  modalProps?: IModal;
}

export const confirmModalState = atom<ModalStateInterface>({
  key: "confirmModalState",
  default: {
    modalType: MODAL_TYPES.ALERT,
    modalOpen: false,
    modalProps: {},
  },
});
