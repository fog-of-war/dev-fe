/** @jsxImportSource @emotion/react */
import ReviewImage from "./ReviewImage";
import ReviewComment from "./ReviewComment";

interface ReviewContentProps {
  placeImage: string;
  comment: string;
  date: string;
  rating: number;
  isEditing?: boolean;
}

const ReviewContent = ({
  placeImage,
  comment,
  date,
  rating,
  isEditing,
}: ReviewContentProps) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <ReviewImage
        placeImage={placeImage}
        date={date}
        rating={rating}
        isEditing={isEditing}
      />
      <ReviewComment comment={comment} isEditing={isEditing} />
    </div>
  );
};

export default ReviewContent;
