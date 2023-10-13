/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import colors from "../../../constants/colors";
import { PostComment } from "../../../types/types";
import { timeSince } from "../../../utils/calculateDate";

interface CommentItemProps {
  comment_author_image_url: PostComment["comment_author"]["user_image_url"];
  comment_author_nickname: PostComment["comment_author"]["user_nickname"];
  comment_text: PostComment["comment_text"];
  comment_date: PostComment["comment_created_at"];
}

const CommentItem = ({
  comment_author_image_url,
  comment_author_nickname,
  comment_text,
  comment_date,
}: CommentItemProps) => {
  return (
    <CommentItemLayout>
      <CommentAuthorInfo>
        <CommentAuthorImage
          src={comment_author_image_url}
          alt="comment_author_profile_image"
        />
        <CommentAuthorNickname>{comment_author_nickname}</CommentAuthorNickname>
      </CommentAuthorInfo>
      <CommentContent>
        <CommentText>{comment_text}</CommentText>
        <CommentDate>{timeSince(comment_date)}</CommentDate>
      </CommentContent>
    </CommentItemLayout>
  );
};

export default CommentItem;

const CommentItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0;
  width: 100%;
  position: relative;
`;

const CommentAuthorInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const CommentAuthorImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 50%;
`;

const CommentAuthorNickname = styled.p`
  font-size: 14px;
  color: #6f6f6f;
  font-weight: 600;
  text-align: center;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 30px;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #6f6f6f;
`;

const CommentDate = styled.p`
  font-size: 12px;
  color: ${colors.lightGrey};
`;

const CommentButtonContainer = styled.div``;

const CommentButton = styled.button``;

const CommentButtonImg = styled.img``;
