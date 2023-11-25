import useConfirmModal from "../../hooks/useConfirmModal";
import Button from "../UI/Button";
import toast from "react-hot-toast";
import { MODAL_TYPES } from "../../types/types.d";

interface ProfileActionButtonProps {
  buttonType: "delete" | "logout" | "terms";
  onConfirm: () => Promise<void>;
  message: string;
  confirmMessage: string;
  successMessage: string;
  buttonText: string;
}

const ProfileActionButton = ({
  onConfirm,
  message,
  confirmMessage,
  successMessage,
  buttonText,
}: ProfileActionButtonProps) => {
  const { openModal, closeModal } = useConfirmModal();

  const handleButtonClick = async () => {
    closeModal();
    await onConfirm();
    if (successMessage) {
      toast.success(successMessage);
    }
  };

  const handleButtonModal = () => {
    openModal({
      modalType: MODAL_TYPES.ALERT,
      modalProps: {
        title: message,
        content: confirmMessage,
        confirmText: buttonText,
        onConfirmHandler: handleButtonClick,
      },
    });
  };

  return (
    <Button
      size="small"
      variant="secondary"
      onClick={handleButtonModal}
      style={{ height: "25px", border: "none",borderRadius: "0" }}
    >
      {buttonText}
    </Button>
  );
};

export default ProfileActionButton;
