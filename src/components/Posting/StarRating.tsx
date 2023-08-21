/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { usePostingContext } from "../../context/PostingDataContext";

const StarRating = () => {
  const { setPostingData } = usePostingContext();
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const fullStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFD700"
      viewBox="0 0 24 24"
      css={starStyle}
    >
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  );

  const emptyStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#e4e5e9"
      viewBox="0 0 24 24"
      css={starStyle}
    >
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  );

  const halfStar = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" css={starStyle}>
      <defs>
        <linearGradient id="halfGradient">
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#e4e5e9" />
        </linearGradient>
      </defs>
      <path
        fill="url(#halfGradient)"
        d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"
      />
    </svg>
  );

  const starsArray = Array.from({ length: 5 });

  const handleClick = (index: number, e: any) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const selectedValue = offsetX < rect.width / 2 ? index + 0.5 : index + 1;
    setRating(selectedValue);
    setPostingData((prevData) => ({
      ...prevData,
      place_star_rating: selectedValue,
    }));
  };

  const handleMouseOver = (index: number, e: any) => {
    const rect = e.target.getBoundingClientRect();
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
            {displayStar === "full" && fullStar}
            {displayStar === "half" && halfStar}
            {displayStar === "empty" && emptyStar}
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

const starStyle = css`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 5px;
`;
