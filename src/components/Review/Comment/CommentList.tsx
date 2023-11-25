import { useState } from "react";
import useConfirmModal from "../../../hooks/useConfirmModal";
import styled from "@emotion/styled";
import CommentItem from "./CommentItem";
import CommentTextArea from "./CommentTextArea";
import { PostComment } from "../../../types/types";
import { deleteComment, editComment } from "../../../api/comment";
import { MODAL_TYPES } from "../../../types/types.d";
import toast from "react-hot-toast";

interface CommentListProps {
  commentsData: PostComment[];
  postId: number;
}

const CommentList = ({ commentsData, postId }: CommentListProps) => {
  const [comments, setComments] = useState<PostComment[]>(commentsData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCommentText, setEditCommentText] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const { openModal, closeModal } = useConfirmModal();

  const handleEditClick = (commentId: number, initialText: string) => {
    if (editCommentId !== commentId) {
      setIsEditing(true);
      setEditCommentText(initialText);
      setEditCommentId(commentId);
    } else {
      setIsEditing(false);
      setEditCommentId(null);
    }
  };

  const handleSaveEdit = async (commentId: number) => {
    try {
      await editComment(commentId, editCommentText);
      const currentTime = new Date().toISOString();

      setComments(
        comments.map((comment) =>
          comment.comment_id === commentId
            ? {
                ...comment,
                comment_text: editCommentText,
                comment_updated_at: currentTime,
              }
            : comment
        )
      );
      setEditCommentId(null);
      setIsEditing(false);
      toast.success("댓글이 수정되었습니다.", { id: "edit-comment-success" });
    } catch (err: any) {
      console.error("댓글 수정 오류: ", err);
      toast.error("댓글 수정에 실패했습니다.", { id: "edit-comment-fail" });
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditCommentText(e.target.value);
  };

  const handleDeleteClick = (commentId: number) => {
    try {
      closeModal();
      deleteComment(commentId);
      const newCommentsData = comments.filter(
        (comment) => comment.comment_id !== commentId
      );
      setComments(newCommentsData);
      toast.success("댓글이 삭제되었습니다.", {
        id: "delete-comment-success",
      });
    } catch (err: any) {
      console.error("댓글 삭제 오류 :", err);
      toast.error("댓글 삭제에 실패했습니다.", { id: "delete-comment-fail" });
    }
  };

  const handleDeleteModal = (commentId: number) => {
    openModal({
      modalType: MODAL_TYPES.ALERT,
      modalProps: {
        title: "해당 댓글을 삭제하시겠습니까?",
        content: "삭제된 데이터는 복구할 수 없습니다.",
        confirmText: "삭제",
        onConfirmHandler: () => handleDeleteClick(commentId),
      },
    });
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
            comment_updated_at={comment.comment_updated_at}
            comment_author_id={comment.comment_author_id}
            editCommentId={editCommentId}
            isEditing={isEditing}
            editCommentText={editCommentText}
            handleEditClick={() =>
              handleEditClick(comment.comment_id, comment.comment_text)
            }
            handleEditChange={handleEditChange}
            handleSaveEdit={() => handleSaveEdit(comment.comment_id)}
            handleDeleteClick={() => handleDeleteModal(comment.comment_id)}
          />
        ))}
        <CommentTextArea
          type="default"
          postId={postId}
          initialText={editCommentText}
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
