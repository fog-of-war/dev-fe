import { useState } from "react";
import styled from "@emotion/styled";
import CommentItem from "./CommentItem";
import CommentTextArea from "./CommentTextArea";
import { PostComment } from "../../../types/types";
import { deleteComment } from "../../../api/comment";
import toast from "react-hot-toast";

interface CommentListProps {
  commentsData: PostComment[];
  postId: number;
}

const CommentList = ({ commentsData, postId }: CommentListProps) => {
  const [comments, setComments] = useState<PostComment[]>(commentsData);

  const handleDeleteClick = (commentId: number) => {
    try {
      if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
        deleteComment(commentId);
        const newCommentsData = comments.filter(
          (comment) => comment.comment_id !== commentId
        );
        setComments(newCommentsData);
        toast.success("댓글이 삭제되었습니다.", {
          id: "delete-comment-success",
        });
      }
    } catch (err: any) {
      console.error("댓글 삭제 오류 :", err);
      toast.error("댓글 삭제에 실패했습니다.", { id: "delete-comment-fail" });
    }
  };

  return (
    <>
      <CommentsContainer>
        {comments.map((comment) => (
          <CommentItem
            key={comment.comment_id}
            comment_id={comment.comment_id}
            comment_author_image_url={comment.comment_author.user_image_url}
            comment_author_nickname={comment.comment_author.user_nickname}
            comment_text={comment.comment_text}
            comment_date={comment.comment_created_at}
            comment_author_id={comment.comment_author_id}
            handleDeleteClick={() => handleDeleteClick(comment.comment_id)}
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
