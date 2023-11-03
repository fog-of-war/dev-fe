/** @jsxImportSource @emotion/react */
import ReviewStarPoint from "./ReviewStarPoint";
import { formatDateToKoreanFormat } from "../../utils/calculateDate";
import StarRating from "../Posting/StarRating";
interface ReviewImageProps {
  placeImage: string;
  date: string;
  rating: number;
  isEditing?: boolean;
}

const ReviewImage = ({
  placeImage,
  date,
  rating,
  isEditing,
}: ReviewImageProps) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          overflow: "hidden",
          aspectRatio: "1/1",
        }}
      >
        <img
          css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={placeImage}
          alt="리뷰 장소 이미지"
        />
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditing ? (
          <StarRating isEditing={isEditing} />
        ) : (
          <ReviewStarPoint rating={rating} />
        )}
        <p
          css={{
            color: "#AAAAAA",
            fontSize: "13px",
          }}
        >
          {formatDateToKoreanFormat(date)}
        </p>
      </div>
    </div>
  );
};

export default ReviewImage;
