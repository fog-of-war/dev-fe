/** @jsxImportSource @emotion/react */

import { useState } from "react";
import ReviewAuthorInfo from "./ReviewAuthorInfo";
import ReviewContent from "./ReviewContent";
import { PlaceData } from "../../types/types";
import Comments from "./Comment/Comments";

interface ReviewListProps {
  reviews?: PlaceData["place_posts"];
  placeId: PlaceData["place_id"];
}

const ReviewList = ({ reviews, placeId }: ReviewListProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      {reviews?.map((review, index) => (
        <div key={index}>
          <div
            css={{
              width: "100%",
              height: "100%",
              paddingTop: "40px",
              paddingBottom: "40px",
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
              <ReviewAuthorInfo
                authorInfo={review.post_author}
                postId={review.post_id}
                placeId={placeId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <ReviewContent
                placeImage={review.post_image_url}
                comment={review.post_description}
                rating={review.post_star_rating}
                date={review.post_created_at}
                isEditing={isEditing}
              />
              <div
                css={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <Comments
                  comments={review.post_comments.length}
                  data={review.post_comments}
                  postId={review.post_id}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewList;
