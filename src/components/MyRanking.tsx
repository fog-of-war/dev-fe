/** @jsxImportSource @emotion/react */

import colors from "../constants/colors";
import MyRankingItem from "./Ranking/MyRankingItem";
import Title from "./Title";
import useRankData from "../hooks/useRankData";

const MyRanking = () => {
  const { regionRankData } = useRankData();

  console.log(regionRankData);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Title
        text="나는 어느 구에서 순위가 높을까?"
        icon="/images/mapIcon.png"
      />
      <div
        css={{
          display: "flex",
          backgroundColor: colors.pastel,
          padding: "25px",
          borderRadius: "15px",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {regionRankData?.map((data, i) => (
          <MyRankingItem
            key={i}
            index={i}
            image={data.region.region_thumbnail_url}
            ranking={data.ranking[0].rank}
            district={data.region.region_name}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRanking;
