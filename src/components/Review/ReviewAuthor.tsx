/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import { PostAuthor } from "../../types/types";
interface ReviewAuthorProps {
  authorInfo: PostAuthor;
}

const ReviewAuthor = ({ authorInfo }: ReviewAuthorProps) => {
  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <div
          css={{
            width: "40px",
            minWidth: "40px",
            heigth: "40px",
            minHeight: "40px",
            overflow: "hidden",
            borderRadius: "100%",
            display: "flex",
            alignItems: "end",
          }}
        >
          <img
            css={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            src={authorInfo.user_image_url}
            alt="profileImage"
          />
        </div>
        <div>
          <p
            css={{
              fontSize: "16px",
              fontWeight: "600",
              color: colors.primary,
            }}
          >
            {authorInfo.user_nickname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewAuthor;
