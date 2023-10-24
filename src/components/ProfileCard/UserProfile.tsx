/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import useAuthQuery from "../../hooks/useAuth";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileInfo from "../../components/ProfileCard/ProfileInfo";
import ProgressBar from "../../components/ProgressBar";

const UserProfile = () => {
  const { data: userData } = useAuthQuery();

  return (
    <UserProfileLayout>
      <ProfileCard
        username={userData?.user_nickname}
        profileText={userData?.user_selected_badge.badge_name}
        profileImage={userData?.user_image_url}
        level={userData?.user_level}
        badgeIcon="./images/badgeIcon.svg"
      />
      <ProfileInfo />
      <ProgressBar
        level={userData?.user_level || 0}
        userPoints={userData?.user_points || 0}
      />
    </UserProfileLayout>
  );
};

export default UserProfile;

const UserProfileLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 420px;
`;
