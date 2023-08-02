/** @jsxImportSource @emotion/react */

import ProfileCard from "../components/ProfileCard/ProfileCard";
import ProfileInfo from "../components/ProfileCard/ProfileInfo";
import ProgressBar from "../components/ProgressBar";
import AdvPlaceList from "../components/AdventurePlace/AdvPlaceList";

const MyPage = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ProfileCard />
      <ProfileInfo />
      <ProgressBar progress={80} />
      <AdvPlaceList />
    </div>
  );
};

export default MyPage;
