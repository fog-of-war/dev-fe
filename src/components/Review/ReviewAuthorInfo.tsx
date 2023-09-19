/** @jsxImportSource @emotion/react */
import { PostAuthor, PlacePost, PlaceData } from "../../types/types";
import ReviewAuthor from "./ReviewAuthor";
import ReviewEditButton from "../UI/ReviewEditButton";
import { userDataState } from "../../store/userAtom";
import { useRecoilValue } from "recoil";
import { useReviewContext } from "../../context/ReviewContext";
import { deletePost, updatePost } from "../../api/post";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ReviewAuthorInfoProps {
  postId: PlacePost["post_id"];
  placeId: PlaceData["place_id"];
  authorInfo: PostAuthor;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewAuthorInfo = ({
  authorInfo,
  isEditing,
  postId,
  placeId,
  setIsEditing,
}: ReviewAuthorInfoProps) => {
  const userData = useRecoilValue(userDataState);
  const { updateReview } = useReviewContext();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(postId);
        toast.success("게시글이 삭제되었습니다.", {
          id: "delete-success",
        });
        navigate(`/reviewList/${placeId}`);
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
    console.log(updateReview);

    try {
      await updatePost(postId, updateReview);
      toast.success("게시글이 수정되었습니다.", {
        id: "update-success",
      });

      // 2초 딜레이 후 navigate 실행
      setTimeout(() => {
        navigate(`/reviewList/${placeId}`);
        setIsEditing(false);
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        id: "update-error",
      });
    }
  };

  console.log("authorInfo", authorInfo);
  console.log("userData", userData);

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
              <ReviewEditButton buttonType="edit" onClick={handleCompleteClick}>
                완료
              </ReviewEditButton>
              <ReviewEditButton buttonType="delete" onClick={handleCancelClick}>
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
              <ReviewEditButton buttonType="delete" onClick={handleDeleteClick}>
                삭제
              </ReviewEditButton>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewAuthorInfo;
