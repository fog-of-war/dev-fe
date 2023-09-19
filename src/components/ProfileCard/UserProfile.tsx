/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { getUserData } from "../../api/user";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileInfo from "../../components/ProfileCard/ProfileInfo";
import ProgressBar from "../../components/ProgressBar";
import { useRecoilState } from "recoil";
import { userDataState } from "../../store/userAtom";

const UserProfile = () => {
  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      console.log(data);
      setUserData(data);
    };
    fetchUserData();
  }, []);

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
