/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import colors from "../../../constants/colors";
import { createComment } from "../../../api/comment";
import Button from "../../UI/Button";

interface CommentTextAreaProps {
  postId: number;
  onNewComment: (newComment: any) => void;
}

const CommentTextArea = ({ postId, onNewComment }: CommentTextAreaProps) => {
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCommentValue = e.target.value;
    setComment(newCommentValue);
  };

  const handleCommentSubmit = async () => {
    try {
      const newComment = await createComment(postId, comment);
      onNewComment(newComment);
      setComment("");
    } catch (err: any) {
      console.error("댓글 작성 오류 :", err);
    }
  };

  return (
    <TextAreaContainer>
      <StyledTextArea
        value={comment}
        onChange={handleCommentChange}
        placeholder="댓글을 입력해주세요"
        maxLength={100}
      />
      <SubmitButtonBox>
        <Button
          size="small"
          variant="primary"
          disabled={comment === ""}
          onClick={handleCommentSubmit}
        >
          작성
        </Button>
      </SubmitButtonBox>
    </TextAreaContainer>
  );
};

export default CommentTextArea;

const TextAreaContainer = styled.div`
  position: relative;
  top: 7px;
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  padding-right: 50px;
  width: 100%;
  height: 80px;
  border: 2px solid ${colors.accent};
  border-radius: 5px;
  font-size: 16px;
  font-family: inherit;
  color: ${colors.darkGrey};
  resize: none;
  outline: none;
  &:focus {
    border-color: ${colors.primary};
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.primary};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ededed;
    border-radius: 10px;
  }
`;

const SubmitButtonBox = styled.div`
  position: absolute;
  bottom: 37.5%;
  right: 10px;
`;
