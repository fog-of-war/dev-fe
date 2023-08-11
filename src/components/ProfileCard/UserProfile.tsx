/** @jsxImportSource @emotion/react */

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileInfo from "../../components/ProfileCard/ProfileInfo";
import ProgressBar from "../../components/ProgressBar";

interface UserData {
  username: string;
  profileText: string;
  profileImage: string;
  level: number;
  badgeIcon: string;
}

const DUMMY_DATA: UserData = {
  username: "여러분과함께라면행복",
  profileText: "마포구 워렌버핏",
  profileImage: "./images/dummyUserImage.png",
  level: 3,
  badgeIcon: "./images/badgeIcon.svg",
};

const UserProfile = ({ userData = DUMMY_DATA }: { userData?: UserData }) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ProfileCard
        username={userData.username}
        profileText={userData.profileText}
        profileImage={userData.profileImage}
        level={userData.level}
        badgeIcon={userData.badgeIcon}
      />
      <ProfileInfo />
      <ProgressBar progress={80} level={userData.level} />
    </div>
  );
};

export default UserProfile;
