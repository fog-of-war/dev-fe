/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useReviewContext } from "../../context/ReviewContext";
import { usePostingContext } from "../../context/PostingDataContext";
import FullStarIcon from "./FullStarIcon";
import HalfStarIcon from "./HalfStarIcon";
import EmptyStarIcon from "./EmptyStarIcon";

interface StarRatingProps {
  isEditing?: boolean;
}

const StarRating = ({ isEditing = false }: StarRatingProps) => {
  const { setPostUploadData } = usePostingContext();
  const { setUpdateReview } = useReviewContext();
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const starsArray = Array.from({ length: 5 });

  const calculateStarValue = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    return offsetX < rect.width / 2 ? index + 0.5 : index + 1;
  };

  const updateStarRating = (value: number) => {
    setRating(value);

    const updater = isEditing ? setUpdateReview : setPostUploadData;
    updater((prevData: any) => ({
      ...prevData,
      post_star_rating: value,
    }));
  };

  const handleStarClick = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    const selectedValue = calculateStarValue(index, e);
    updateStarRating(selectedValue);
  };

  const handleMouseOver = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    const hoverValue = calculateStarValue(index, e);
    setHover(hoverValue);
  };

  return (
    <div>
      {starsArray.map((_, index) => {
        let displayStar;

        if (hover !== null) {
          displayStar =
            hover > index + 0.5 ? "full" : hover > index ? "half" : "empty";
        } else if (rating !== null) {
          displayStar =
            rating > index + 0.5 ? "full" : rating > index ? "half" : "empty";
        } else {
          displayStar = "empty";
        }

        return (
          <span
            key={index}
            onClick={(e) => handleStarClick(index, e)}
            onMouseMove={(e) => handleMouseOver(index, e)}
            onMouseLeave={() => setHover(null)}
          >
            {displayStar === "full" && <FullStarIcon isEditing={isEditing} />}
            {displayStar === "half" && <HalfStarIcon isEditing={isEditing} />}
            {displayStar === "empty" && <EmptyStarIcon isEditing={isEditing} />}
          </span>
        );
      })}
      {!isEditing && (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {rating !== null && (
            <p>
              {`${rating}/5`} {rating === 5 ? "최고에요!" : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StarRating;

export const starStyle = (isEditing: boolean) => css`
  width: ${isEditing ? "30px" : "40px"};
  height: ${isEditing ? "30px" : "40px"};
  cursor: pointer;
  margin-right: 5px;
`;
