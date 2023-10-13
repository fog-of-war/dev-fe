import { PostComment } from "../types/types";
import { axiosBase } from "./axios";

export const createComment = async (
  postId: number,
  comment: string
): Promise<PostComment> => {
  const response = await axiosBase.post<PostComment>("/v1/comments", {
    comment_text: comment,
    commented_post_id: postId,
  });
  const newComment = response.data;
  return newComment;
};

export const editComment = async (
  commentId: number,
  comment: string
): Promise<PostComment> => {
  const response = await axiosBase.patch<PostComment>(
    `/v1/comments/${commentId}`,
    {
      comment_text: comment,
    }
  );
  const editedComment = response.data;
  return editedComment;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await axiosBase.delete(`/v1/comments/${commentId}`);
};
