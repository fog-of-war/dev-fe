/** @jsxImportSource @emotion/react */
import ReviewImage from "./ReviewImage";
import ReviewComment from "./ReviewComment";

interface ReviewContentProps {
  placeImage: string;
  comment: string;
  date: string;
  rating: number;
}

const ReviewContent = ({
  placeImage,
  comment,
  date,
  rating,
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
      <ReviewComment comment={comment} />
    </div>
  );
};

export default ReviewContent;
