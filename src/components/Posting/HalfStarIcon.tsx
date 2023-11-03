/** @jsxImportSource @emotion/react */
import { starStyle } from "./StarRating";

interface StarIconProps {
  isEditing: boolean;
}

const HalfStarIcon = ({ isEditing = false }: StarIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      css={starStyle(isEditing)}
    >
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
};

export default HalfStarIcon;
