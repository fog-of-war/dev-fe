/** @jsxImportSource @emotion/react */

import { useState } from "react";
import colors from "../../constants/colors";
interface ReviewCommentProps {
  comment: string;
  isEditing?: boolean;
  onEditComment?: (newComment: string) => void;
}

const ReviewComment = ({
  comment,
  isEditing = false,
  onEditComment,
}: ReviewCommentProps) => {
  const [editedComment, setEditedComment] = useState<string>(comment);
  const [isCommentChanged, setIsCommentChanged] = useState<boolean>(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(e.target.value);
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
            border: `1px solid ${colors.primary}`,
            borderRadius: "5px",
            fontSize: "16px",
            fontFamily: "inherit",
            color: colors.subFont,
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
            borderColor: isCommentChanged ? colors.secondary : undefined,
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
