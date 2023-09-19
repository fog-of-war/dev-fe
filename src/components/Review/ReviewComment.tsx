/** @jsxImportSource @emotion/react */

import { useState } from "react";
import colors from "../../constants/colors";
import { useReviewContext } from "../../context/ReviewContext";
interface ReviewCommentProps {
  comment: string;
  isEditing?: boolean;
}

const ReviewComment = ({ comment, isEditing = false }: ReviewCommentProps) => {
  const [editedComment, setEditedComment] = useState<string>(comment);
  const [isCommentChanged, setIsCommentChanged] = useState<boolean>(false);
  const { setUpdateReview } = useReviewContext();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCommentValue = e.target.value;
    setEditedComment(newCommentValue);
    setUpdateReview((prevState) => ({
      ...prevState,
      post_description: newCommentValue,
    }));
  };

  return (
    <div
      css={{
        width: "100%",
        height: "100%",
      }}
    >
      {isEditing ? (
        <textarea
          onFocus={() => setIsCommentChanged(true)}
          onBlur={() => setIsCommentChanged(false)}
          css={{
            padding: "10px",
            width: "100%",
            height: "100%",
            minHeight: "100px",
            border: `2px solid ${colors.accent}`,
            borderRadius: "5px",
            fontSize: "16px",
            fontFamily: "inherit",
            color: colors.darkGrey,
            resize: "none",
            outline: "none",
            "&::-webkit-scrollbar": {
              width: "7px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.primary,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#ededed",
              borderRadius: "10px",
            },
            borderColor: isCommentChanged ? colors.primary : undefined,
          }}
          maxLength={140}
          value={editedComment}
          onChange={handleCommentChange}
        />
      ) : (
        <p>{comment}</p>
      )}
    </div>
  );
};

export default ReviewComment;
