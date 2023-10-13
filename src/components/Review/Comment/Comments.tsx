/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

interface CommentsProps {
  comments: number;
}

const Comments = ({ comments }: CommentsProps) => {
  return (
    <CommentLayout>
      <CommentIconBox>
        <CommentIconImg src="/images/comment.svg" alt="comment_icon" />
      </CommentIconBox>
      <CommentLengthBox>
        <CommentText>댓글</CommentText>
        <CommentCount>{comments}</CommentCount>
      </CommentLengthBox>
    </CommentLayout>
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
