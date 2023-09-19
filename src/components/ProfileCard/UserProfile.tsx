/** @jsxImportSource @emotion/react */
import useAuthQuery from "../../hooks/useAuthQuery";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileInfo from "../../components/ProfileCard/ProfileInfo";
import ProgressBar from "../../components/ProgressBar";

const UserProfile = () => {
  const { data: userData } = useAuthQuery();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ProfileCard
        username={userData?.user_nickname}
        profileText={userData?.user_badges[0]?.badge_name}
        profileImage={userData?.user_image_url}
        level={userData?.user_level}
        badgeIcon="./images/badgeIcon.svg"
      />
      <ProfileInfo />
      <ProgressBar
        level={userData?.user_level || 0}
        userPoints={userData?.user_points || 0}
      />
    </div>
  );
};

export default UserProfile;
