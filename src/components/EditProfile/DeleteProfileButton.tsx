/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/user";
import Button from "../UI/Button";
import toast from "react-hot-toast";
import { LINK } from "../../constants/links";
import { clearAllLocalStorage } from "../../utils/localStorage";

const DeleteProfileButton = () => {
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (window.confirm("정말로 회원 탈퇴 하시겠습니까?")) {
      await deleteUser();
      clearAllLocalStorage();
      toast.success("회원 탈퇴가 완료되었습니다.", {
        id: "delete-user-success",
      });
      navigate(LINK.AUTH_PAGE);
    }
  };

  return (
    <Button
      size="small"
      variant="secondary"
      onClick={handleDeleteUser}
      style={{
        width: "100px",
        height: "27px",
      }}
    >
      회원 탈퇴
    </Button>
  );
};

export default DeleteProfileButton;
