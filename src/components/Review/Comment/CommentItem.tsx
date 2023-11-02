/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import colors from "../../../constants/colors";
import { PostComment } from "../../../types/types";
import { timeSince } from "../../../utils/calculateDate";
import useAuth from "../../../hooks/useAuth";
import ButtonModal from "./ButtonModal";
import EditDeleteButton from "./EditDeleteButton";
import CommentTextArea from "./CommentTextArea";
import DotButton from "../../UI/DotButton";

interface CommentItemProps {
  comment_author_image_url: PostComment["comment_author"]["user_image_url"];
  comment_author_nickname: PostComment["comment_author"]["user_nickname"];
  comment_text: PostComment["comment_text"];
  comment_date: PostComment["comment_created_at"];
  comment_updated_at?: PostComment["comment_updated_at"];
  comment_author_id: PostComment["comment_author_id"];
  comment_id: PostComment["comment_id"];
  editCommentId: number | null;
  isEditing: boolean;
  editCommentText: string;
  handleEditClick: (commentId: number, initialText: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSaveEdit: (commentId: number) => void;
  handleDeleteClick: (commentId: number) => void;
}

const CommentItem = ({
  comment_author_image_url,
  comment_author_nickname,
  comment_text,
  comment_date,
  comment_updated_at,
  comment_author_id,
  handleDeleteClick,
  comment_id,
  editCommentId,
  isEditing,
  editCommentText,
  handleEditClick,
  handleEditChange,
  handleSaveEdit,
}: CommentItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { data: userData } = useAuth();

  const userId = userData?.user_id;

  const toggleModalVisibility = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  return (
    <CommentItemLayout>
      <CommentAuthorInfo>
        <CommentAuthorImage
          src={comment_author_image_url}
          alt="comment_author_profile_image"
        />
        <CommentAuthorNickname>{comment_author_nickname}</CommentAuthorNickname>
        <ButtonContainer>
          {userId === comment_author_id && (
            <DotButton setModalState={toggleModalVisibility} />
          )}
          {isModalVisible && (
            <ButtonModal>
              <EditDeleteButton
                isEditing={isEditing}
                commentId={comment_id}
                commentText={comment_text}
                handleEditClick={() =>
                  handleEditClick(comment_id, comment_text)
                }
                handleDeleteClick={() => handleDeleteClick(comment_id)}
              />
            </ButtonModal>
          )}
        </ButtonContainer>
      </CommentAuthorInfo>
      <CommentContent>
        {isEditing && editCommentId === comment_id ? (
          <CommentTextArea
            type="edit"
            postId={0}
            onNewComment={() => null}
            initialText={editCommentText}
            handleEditChange={handleEditChange}
            handleEditSubmit={() => handleSaveEdit(comment_id)}
          />
        ) : (
          <>
            <CommentText>{comment_text}</CommentText>
            <CommentDate>
              {comment_updated_at && comment_updated_at !== comment_date
                ? `${timeSince(comment_updated_at)} 수정됨`
                : timeSince(comment_date)}
            </CommentDate>
          </>
        )}
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

const ButtonContainer = styled.div`
  width: 10px;
  height: 20px;
  position: absolute;
  right: 0;
  cursor: pointer;
`;
