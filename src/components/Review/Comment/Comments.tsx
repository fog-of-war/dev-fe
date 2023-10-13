/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import CommentList from "./CommentList";
import { PostComment } from "../../../types/types";

interface CommentsProps {
  comments: number;
  data: PostComment[];
}

const Comments = ({ comments, data }: CommentsProps) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false);

  const toggleCommentsVisibility = () => {
    setIsCommentsVisible((prevState) => !prevState);
  };

  return (
    <>
      <CommentLayout>
        <CommentIconBox onClick={toggleCommentsVisibility}>
          <CommentIconImg src="/images/comment.svg" alt="comment_icon" />
        </CommentIconBox>
        <CommentLengthBox>
          <CommentText>댓글</CommentText>
          <CommentCount>{comments}</CommentCount>
        </CommentLengthBox>
      </CommentLayout>
      {isCommentsVisible && <CommentList commentsData={data} />}
    </>
  );
};

export default Comments;

const CommentLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  position: absolute;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 10px;
`;

const CommentIconBox = styled.div`
  width: 23px;
  height: 23px;
  overflow: hidden;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const CommentIconImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CommentLengthBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #6f6f6f;
`;

const CommentCount = styled.p`
  font-size: 14px;
  color: #6f6f6f;
  font-weight: 500;
`;
