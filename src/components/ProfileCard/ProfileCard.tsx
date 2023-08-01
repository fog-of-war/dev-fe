import colors from "../../constants/colors";
import styled from "@emotion/styled";

const DUMMY_DATA = {
  username: "죽어가는카드지갑",
  profileText: "마포구 워렌버핏",
  profileImage: "./images/dummyUserImage.png",
  level: 3,
  badgeIcon: "./images/badgeIcon.svg",
};

const ProfileCard = () => {
  return (
    <ProfileCardWrapper>
      <ProfileLevelBox>Lv.{DUMMY_DATA.level}</ProfileLevelBox>
      <ProfileImgBox>
        <ProfileImg src={DUMMY_DATA.profileImage} alt="profileImage" />
      </ProfileImgBox>
      <ProfileInfoContainer>
        <ProfileBadgeContainer>
          <ProfileBadgeBox>
            <img src={DUMMY_DATA.badgeIcon} alt="badgeIcon" />
          </ProfileBadgeBox>
          <ProfileTextBox>
            <span>{DUMMY_DATA.profileText}</span>
          </ProfileTextBox>
          <ProfileEditIconBox
            src="./images/profileEditIcon.svg"
            alt="editIcon"
          />
        </ProfileBadgeContainer>
        <ProfileNicknameBox>{DUMMY_DATA.username}님</ProfileNicknameBox>
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

const ProfileLevelBox = styled.div`
  font-weight: 400;
  color: white;
  width: 32px;
  height: 20px;
  background-color: ${colors.primary};
  font-size: 12px;
  border-radius: 10px;
  padding: 2px 5px;
  position: absolute;
  top: -10px;
  left: 20px;
  z-index: 1;
  text-align: center;
`;

const ProfileImgBox = styled.div`
  width: 83px;
  height: 83px;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
`;

const ProfileImg = styled.img`
  position: absolute;
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
  padding: 0 10px;
`;

const ProfileBadgeContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const ProfileBadgeBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileTextBox = styled.div`
  color: ${colors.primary};
  font-weight: bold;
`;

const ProfileEditIconBox = styled.img``;

const ProfileNicknameBox = styled.div`
  color: ${colors.secondary};
  font-weight: bold;
`;
