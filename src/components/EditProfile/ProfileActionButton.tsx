import Button from "../UI/Button";
import toast from "react-hot-toast";

interface ProfileActionButtonProps {
  buttonType: "delete" | "logout";
  onConfirm: () => Promise<void>;
  confirmMessage: string;
  successMessage: string;
  buttonText: string;
}

const ProfileActionButton = ({
  buttonType,
  onConfirm,
  confirmMessage,
  successMessage,
  buttonText,
}: ProfileActionButtonProps) => {
  const handleButtonClick = async () => {
    if (window.confirm(confirmMessage)) {
      await onConfirm();
      toast.success(successMessage);
    }
  };

  return (
    <Button
      size="small"
      variant="secondary"
      onClick={handleButtonClick}
      style={{ height: "25px", border: "none", borderRadius: "0" }}
    >
      {buttonText}
    </Button>
  );
};

export default ProfileActionButton;
