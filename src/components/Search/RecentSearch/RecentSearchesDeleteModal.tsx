/** @jsxImportSource @emotion/react */

import colors from "../../../constants/colors";
import { useDeleteComfirmModal } from "../../../hooks/useDeleteComfirmModal";
import B1 from "../../UI/B1";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

interface RecentSearchesDeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const RecentSearchesDeleteModal = ({
  onClose,
  onDelete,
}: RecentSearchesDeleteModalProps) => {
  const modal = useDeleteComfirmModal();

  return (
    <Modal isOpen={modal.isOpen} css={{ paddingBottom: "15px" }}>
      <B1>선택한 기록을 모두 삭제 하시겠습니까?</B1>
      <div
        css={{
          display: "flex",
          width: "100%",
          justifyContent: "end",
          gap: "5px",
        }}
      >
        <Button
          variant="textOnly"
          onClick={onClose}
          css={{ color: colors.mediumGrey }}
        >
          취소
        </Button>
        <Button variant="textOnly" onClick={onDelete}>
          삭제
        </Button>
      </div>
    </Modal>
  );
};

export default RecentSearchesDeleteModal;
