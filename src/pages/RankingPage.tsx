/** @jsxImportSource @emotion/react */

import UserProfile from "../components/ProfileCard/UserProfile";
import MyRanking from "../components/MyRanking";
import TotalRanking from "../components/Ranking/TotalRanking";
import Title from "../components/Title";
import useRankData from "../hooks/useRankData";

const RankingPage = () => {
  const { allRankData } = useRankData();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <UserProfile />
      <div
        css={{
          marginTop: "10px",
        }}
      >
        <MyRanking />
      </div>
      <Title text="전체 랭킹 확인하기" icon="./images/mapIcon.png" />
      <div
        css={{
          borderTop: "1px solid #f1f1f1",
        }}
      >
        {allRankData?.map((data, index) => (
          <TotalRanking
            key={index}
            ranking={data.rank}
            profileImage={data.user_image_url}
            nickname={data.user_nickname}
            flagIcon="/images/flagIcon.png"
            badgeIcon="/images/badgeIcon.svg"
            advanturePoint={data.user_points}
            badgeCount={data.user_badges_count}
          />
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
