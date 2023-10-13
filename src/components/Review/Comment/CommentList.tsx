import styled from "@emotion/styled";
import CommentItem from "./CommentItem";
import { PostComment } from "../../../types/types";

interface CommentListProps {
  commentsData: PostComment[];
}

const CommentList = ({ commentsData }: CommentListProps) => {
  return (
    <CommentsContainer>
      {commentsData.map((comment) => (
        <CommentItem
          key={comment.comment_id}
          comment_author_image_url={comment.comment_author.user_image_url}
          comment_author_nickname={comment.comment_author.user_nickname}
          comment_text={comment.comment_text}
          comment_date={comment.comment_created_at}
        />
      ))}
    </CommentsContainer>
  );
};

export default CommentList;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  top: 35px;
  width: 100%;
  height: 100%;
  max-height: 300px;
  overflow-y: auto;
`;
