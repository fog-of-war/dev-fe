import colors from "../../constants/colors";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

interface ProfileCardProps {
  username?: string;
  profileText?: string;
  profileImage?: string;
  level?: number;
  badgeIcon?: string;
}

const ProfileCard = ({
  username,
  profileText,
  profileImage,
  level,
  badgeIcon,
}: ProfileCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ProfileCardWrapper>
      <ProfileImageContainer>
        <ProfileLevelBox>Lv.{level}</ProfileLevelBox>
        <ProfileImgBox>
          <ProfileImg src={profileImage} alt="profileImage" />
        </ProfileImgBox>
      </ProfileImageContainer>
      <ProfileInfoContainer>
        <ProfileBadgeContainer>
          <ProfileBadgeBox>
            <img src={badgeIcon} alt="badgeIcon" />
          </ProfileBadgeBox>
          <ProfileTextBox>
            <span>{profileText}</span>
          </ProfileTextBox>
          {location.pathname === "/profile" && (
            <ProfileEditButton onClick={() => navigate("/profile_edit")}>
              <ProfileEditIcon
                src="./images/profileEditIcon.svg"
                alt="editIcon"
              />
            </ProfileEditButton>
          )}
        </ProfileBadgeContainer>
        <ProfileNicknameBox>{username}</ProfileNicknameBox>
      </ProfileInfoContainer>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;

const ProfileCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  position: relative;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const ProfileLevelBox = styled.div`
  font-weight: bold;
  color: white;
  height: 20px;
  background-color: ${colors.primary};
  font-size: 12px;
  border-radius: 10px;
  padding: 0 5px;
  padding-bottom: 1px;
  z-index: 1;
  display: flex;
  align-items: center;
  position: relative;
  bottom: 6px;
  line-height: 1;
`;

const ProfileImgBox = styled.div`
  width: 83px;
  height: 83px;
  border-radius: 100%;
  overflow: hidden;
  position: absolute;
`;

const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  inset: 0;
`;

const ProfileInfoContainer = styled.div`
  width: 230px;
  height: 83px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
`;

const ProfileBadgeContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const ProfileBadgeBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileTextBox = styled.div`
  color: ${colors.primary};
  font-weight: bold;
`;

const ProfileEditButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding-top: 3px;
`;

const ProfileEditIcon = styled.img`
  padding-left: 5px;
  cursor: pointer;
`;

const ProfileNicknameBox = styled.div`
  color: ${colors.secondary};
  font-weight: bold;
  font-size: 20px;
`;
