/** @jsxImportSource @emotion/react */

import ProfileCard from "../components/ProfileCard/ProfileCard";
import ProfileInfo from "../components/ProfileCard/ProfileInfo";
import ProgressBar from "../components/ProgressBar";
import MyRanking from "../components/MyRanking";
import TotalRanking from "../components/Ranking/TotalRanking";
import Title from "../components/Title";

const DUMMY_DATA = [
  {
    ranking: 1,
    profileImage: "https://source.unsplash.com/random",
    nickname: "예쁘게죽어가는김정훈",
    flagIcon: "/images/flagIcon.png",
    badgeIcon: "/images/badgeIcon.svg",
    advanturePoint: 15000,
    badgeCount: 3,
  },
  {
    ranking: 2,
    profileImage: "https://source.unsplash.com/random",
    nickname: "살아나는뽀윤득수가좌",
    flagIcon: "/images/flagIcon.png",
    badgeIcon: "/images/badgeIcon.svg",
    advanturePoint: 15000,
    badgeCount: 3,
  },
  {
    ranking: 3,
    profileImage: "https://source.unsplash.com/random",
    nickname: "죽어가는최애의동균님",
    flagIcon: "/images/flagIcon.png",
    badgeIcon: "/images/badgeIcon.svg",
    advanturePoint: 15000,
    badgeCount: 3,
  },
];

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
          borderTop: "1px solid #e1e1e1",
        }}
      >
        {DUMMY_DATA.map((data, index) => (
          <TotalRanking
            key={index}
            ranking={data.ranking}
            profileImage={data.profileImage}
            nickname={data.nickname}
            flagIcon={data.flagIcon}
            badgeIcon={data.badgeIcon}
            advanturePoint={data.advanturePoint}
            badgeCount={data.badgeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
