/** @jsxImportSource @emotion/react */

import ProfileCard from "../components/ProfileCard/ProfileCard";
import ProfileInfo from "../components/ProfileCard/ProfileInfo";
import ProgressBar from "../components/ProgressBar";

const RankingPage = () => {
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
    </div>
  );
};

export default RankingPage;
