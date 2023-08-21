/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { usePostingContext } from "../../context/PostingDataContext";
import FullStarIcon from "./FullStarIcon";
import HalfStarIcon from "./HalfStarIcon";
import EmptyStarIcon from "./EmptyStarIcon";

const StarRating = () => {
  const { setPostingData } = usePostingContext();
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const starsArray = Array.from({ length: 5 });

  const handleClick = (index: number, e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const selectedValue = offsetX < rect.width / 2 ? index + 0.5 : index + 1;
    setRating(selectedValue);
    setPostingData((prevData) => ({
      ...prevData,
      place_star_rating: selectedValue,
    }));
  };

  const handleMouseOver = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const hoverValue = offsetX < rect.width / 2 ? index + 0.5 : index + 1;
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
            onClick={(e) => handleClick(index, e)}
            onMouseMove={(e) => handleMouseOver(index, e)}
            onMouseLeave={() => setHover(null)}
          >
            {displayStar === "full" && <FullStarIcon />}
            {displayStar === "half" && <HalfStarIcon />}
            {displayStar === "empty" && <EmptyStarIcon />}
          </span>
        );
      })}
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
    </div>
  );
};

export default StarRating;

export const starStyle = css`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 5px;
`;
