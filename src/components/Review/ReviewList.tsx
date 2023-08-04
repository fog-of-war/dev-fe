/** @jsxImportSource @emotion/react */

import ReviewAuthorInfo from "./ReviewAuthorInfo";
import ReviewContent from "./ReviewContent";
import { Review } from "../../types/types";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <>
      {reviews.map((review: Review, index: number) => (
        <div key={index}>
          <div
            css={{
              width: "100%",
              height: "100%",
              paddingTop: "40px",
            }}
          >
            <div
              css={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <ReviewAuthorInfo authorInfo={review.authorInfo} />
              <ReviewContent
                placeImage={review.placeImage}
                comment={review.comment}
                rating={review.rating}
                date={review.date}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewList;
