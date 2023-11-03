/** @jsxImportSource @emotion/react */
import { starStyle } from "./StarRating";

interface StarIconProps {
  isEditing: boolean;
}

const FullStarIcon = ({ isEditing = false }: StarIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFD700"
      viewBox="0 0 24 24"
      css={starStyle(isEditing)}
    >
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  );
};

export default FullStarIcon;
