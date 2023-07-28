/** @jsxImportSource @emotion/react */

import colors from "../constants/colors";
import MyRankingItem from "./Ranking/MyRankingItem";
import Title from "./Title";

const DUMMY_DATA = [
  {
    image:
      "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    ranking: 1,
    district: "강남구",
  },
  {
    image:
      "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    ranking: 10,
    district: "강서구",
  },
  {
    image:
      "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    ranking: 32,
    district: "양천구",
  },
];

const MyRanking = () => {
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
          backgroundColor: colors.tertiary,
          padding: "25px",
          borderRadius: "15px",
          gap: "25px",
        }}
      >
        {DUMMY_DATA.map((item, i) => (
          <MyRankingItem
            key={i}
            index={i}
            image={item.image}
            ranking={item.ranking}
            district={item.district}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRanking;
