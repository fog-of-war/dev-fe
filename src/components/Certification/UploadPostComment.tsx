/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import colors from "../../constants/colors";
import { usePostingContext } from "../../context/PostingDataContext";

const UploadPostComment = () => {
  const [isCommentChanged, setIsCommentChanged] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { setPostUploadData } = usePostingContext();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    setPostUploadData((prevData) => {
      return {
        ...prevData,
        post_description: value,
      };
    });
  };

  return (
    <div
      css={{
        width: "100%",
        height: "140px",
      }}
    >
      <textarea
        css={css`
          ${TextAreaStyle}
          border-color: ${isCommentChanged ? colors.primary : colors.accent};
        `}
        onFocus={() => setIsCommentChanged(true)}
        onBlur={() => setIsCommentChanged(false)}
        onChange={handleCommentChange}
        value={comment}
        placeholder="오늘 방문한 장소는 어떠셨나요?"
        maxLength={140}
      ></textarea>
    </div>
  );
};

export default UploadPostComment;

const TextAreaStyle = css`
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-radius: 15px;
  font-size: 16px;
  color: ${colors.darkGrey};
  padding: 10px;
  resize: none;
  outline: none;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.primary};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ededed;
    border-radius: 10px;
  }
`;
