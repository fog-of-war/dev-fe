/** @jsxImportSource @emotion/react */
import { AuthorInfo } from "../../types/types";
import ReviewAuthor from "./ReviewAuthor";

interface ReviewAuthorInfoProps {
  authorInfo: AuthorInfo;
}

const ReviewAuthorInfo = ({ authorInfo }: ReviewAuthorInfoProps) => {
  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "end",
      }}
    >
      <div>
        <ReviewAuthor authorInfo={authorInfo} />
      </div>
    </div>
  );
};

export default ReviewAuthorInfo;
