/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import { AuthorInfo } from "../../types/types";

interface ReviewAuthorProps {
  authorInfo: AuthorInfo;
}

const ReviewAuthor = ({ authorInfo }: ReviewAuthorProps) => {
  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: "0 20px",
        gap: "10px",
        alignItems: "center",
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
          src={authorInfo.profileImage}
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
          {authorInfo.nickname}
        </p>
      </div>
    </div>
  );
};

export default ReviewAuthor;
