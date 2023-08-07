/** @jsxImportSource @emotion/react */
import { AuthorInfo } from "../../types/types";
import ReviewAuthor from "./ReviewAuthor";
import ReviewEditButton from "../UI/ReviewEditButton";

interface ReviewAuthorInfoProps {
  authorInfo: AuthorInfo;
  isEditing?: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const loggedInUserId = "1";

const ReviewAuthorInfo = ({
  authorInfo,
  isEditing = false,
  setIsEditing,
}: ReviewAuthorInfoProps) => {
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {};

  const handleCompleteClick = () => {
    setIsEditing(false);
  };
  return (
    <div
      css={{
        width: "100%",
        display: "flex",
      }}
    >
      <ReviewAuthor authorInfo={authorInfo} />
      {authorInfo._id === loggedInUserId && (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {isEditing ? (
            <ReviewEditButton buttonType="edit" onClick={handleCompleteClick}>
              완료
            </ReviewEditButton>
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
