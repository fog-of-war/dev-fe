import { atom, useRecoilState } from "recoil";

const deleteConfirmModalState = atom({
  key: "deleteConfirmModalState",
  default: false,
});

export function useDeleteComfirmModal() {
  const [isOpen, setIsOpen] = useRecoilState(deleteConfirmModalState);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
}
