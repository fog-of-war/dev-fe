import { useState } from "react";
import styled from "@emotion/styled";
import CommentItem from "./CommentItem";
import CommentTextArea from "./CommentTextArea";
import { PostComment } from "../../../types/types";

interface CommentListProps {
  commentsData: PostComment[];
  postId: number;
}

const CommentList = ({ commentsData, postId }: CommentListProps) => {
  const [comments, setComments] = useState<PostComment[]>(commentsData);

  return (
    <>
      <CommentsContainer>
        {comments.map((comment) => (
          <CommentItem
            key={comment.comment_id}
            comment_author_image_url={comment.comment_author.user_image_url}
            comment_author_nickname={comment.comment_author.user_nickname}
            comment_text={comment.comment_text}
            comment_date={comment.comment_created_at}
            comment_author_id={comment.comment_author_id}
          />
        ))}
        <CommentTextArea
          postId={postId}
          onNewComment={(newComment) =>
            setComments((prevComments) => [...prevComments, newComment])
          }
        />
      </CommentsContainer>
    </>
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
`;
