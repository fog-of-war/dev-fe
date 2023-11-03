/** @jsxImportSource @emotion/react */
import React from "react";
import { PostAuthor, PlacePost, PlaceData } from "../../types/types";
import ReviewAuthor from "./ReviewAuthor";
import ReviewEditButton from "../UI/ReviewEditButton";
import { useReviewContext } from "../../context/ReviewContext";
import { deletePost, updatePost } from "../../api/post";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

interface ReviewAuthorInfoProps {
  postId: PlacePost["post_id"];
  placeId: PlaceData["place_id"];
  authorInfo: PostAuthor;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewAuthorInfo = React.memo(
  ({ authorInfo, isEditing, postId, setIsEditing }: ReviewAuthorInfoProps) => {
    const { updateReview } = useReviewContext();
    const { data: userData, invalidateCurrentUser } = useAuth();

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleDeleteClick = async () => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        try {
          await deletePost(postId);
          invalidateCurrentUser();
          window.location.reload();
          toast.success("게시글이 삭제되었습니다.", {
            id: "delete-success",
          });
        } catch (error: any) {
          toast.error(
            error.response?.data?.message ||
              "게시글 삭제 중 오류가 발생했습니다.",
            {
              id: "delete-error",
            }
          );
        }
      }
    };

    const handleCancelClick = () => {
      setIsEditing(false);
    };

    const handleCompleteClick = async () => {
      try {
        await updatePost(postId, updateReview);
        setIsEditing(false);
        invalidateCurrentUser();

        window.location.reload();
        toast.success("게시글이 수정되었습니다.", {
          id: "update-success",
        });
      } catch (error: any) {
        if (
          error.response.status === 422 &&
          (updateReview.post_star_rating === 0 ||
            updateReview.post_description === "")
        ) {
          toast.error("별점과 리뷰는 필수 항목입니다.", {
            id: "upload-post-error",
          });
          return;
        }
        toast.error(error.response.data.message, {
          id: "update-error",
        });
      }
    };

    return (
      <div
        css={{
          width: "100%",
          display: "flex",
        }}
      >
        <ReviewAuthor authorInfo={authorInfo} />
        {authorInfo.user_id === userData?.user_id && (
          <div
            css={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {isEditing ? (
              <>
                <ReviewEditButton
                  buttonType="edit"
                  onClick={handleCompleteClick}
                >
                  완료
                </ReviewEditButton>
                <ReviewEditButton
                  buttonType="delete"
                  onClick={handleCancelClick}
                >
                  취소
                </ReviewEditButton>
              </>
            ) : (
              <>
                <ReviewEditButton
                  buttonType="edit"
                  onClick={handleEditClick}
                  css={{ marginRight: "10px" }}
                >
                  수정
                </ReviewEditButton>
                <ReviewEditButton
                  buttonType="delete"
                  onClick={handleDeleteClick}
                >
                  삭제
                </ReviewEditButton>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default ReviewAuthorInfo;
