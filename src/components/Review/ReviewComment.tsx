/** @jsxImportSource @emotion/react */

interface ReviewCommentProps {
  comment: string;
}

const ReviewComment = ({ comment }: ReviewCommentProps) => {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
      }}
    >
      <p>{comment}</p>
    </div>
  );
};

export default ReviewComment;
