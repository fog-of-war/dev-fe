/** @jsxImportSource @emotion/react */
import ReviewImage from "./ReviewImage";
import ReviewComment from "./ReviewComment";

interface ReviewContentProps {
  placeImage: string;
  comment: string;
  date: string;
  rating: number;
  isEditing?: boolean;
  onEditComment?: (newComment: string) => void;
}

const ReviewContent = ({
  placeImage,
  comment,
  date,
  rating,
  isEditing = false,
  onEditComment,
}: ReviewContentProps) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <ReviewImage placeImage={placeImage} date={date} rating={rating} />
      <ReviewComment
        comment={comment}
        isEditing={isEditing}
        onEditComment={onEditComment}
      />
    </div>
  );
};

export default ReviewContent;
