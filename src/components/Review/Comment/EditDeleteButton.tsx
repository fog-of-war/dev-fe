/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import colors from "../../../constants/colors";
import Button from "../../UI/Button";

interface EditDeleteButtonProps {
  commentId: number;
  handleDeleteClick: (commentId: number) => void;
}

const EditDeleteButton = ({
  handleDeleteClick,
  commentId,
}: EditDeleteButtonProps) => {
  return (
    <>
      <ButtonBox>
        <Button
          size="small"
          variant="textOnly"
          style={{
            border: "none",
            borderRadius: "0px",
            color: colors.secondary,
          }}
        >
          수정
        </Button>
      </ButtonBox>
      <ButtonBox>
        <Button
          size="small"
          variant="textOnly"
          style={{
            border: "none",
            borderRadius: "0px",
            color: colors.secondary,
          }}
          onClick={() => handleDeleteClick(commentId)}
        >
          삭제
        </Button>
      </ButtonBox>
    </>
  );
};

export default EditDeleteButton;

const ButtonBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
