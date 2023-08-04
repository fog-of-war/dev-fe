import colors from "../../constants/colors";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const DUMMY_DATA = {
  username: "여러분과함께라면행복",
  profileText: "마포구 워렌버핏",
  profileImage: "./images/dummyUserImage.png",
  level: 3,
  badgeIcon: "./images/badgeIcon.svg",
};

const ProfileCard = () => {
  const navigate = useNavigate();

  return (
    <ProfileCardWrapper>
      <ProfileImageContainer>
        <ProfileLevelBox>Lv.{DUMMY_DATA.level}</ProfileLevelBox>
        <ProfileImgBox>
          <ProfileImg src={DUMMY_DATA.profileImage} alt="profileImage" />
        </ProfileImgBox>
      </ProfileImageContainer>
      <ProfileInfoContainer>
        <ProfileBadgeContainer>
          <ProfileBadgeBox>
            <img src={DUMMY_DATA.badgeIcon} alt="badgeIcon" />
          </ProfileBadgeBox>
          <ProfileTextBox>
            <span>{DUMMY_DATA.profileText}</span>
          </ProfileTextBox>
          <ProfileEditButton onClick={() => navigate("/profileEdit")}>
            <ProfileEditIcon
              src="./images/profileEditIcon.svg"
              alt="editIcon"
            />
          </ProfileEditButton>
        </ProfileBadgeContainer>
        <ProfileNicknameBox>{DUMMY_DATA.username}</ProfileNicknameBox>
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
