/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";

import ProgressBar from "../ProgressBar";
import MainCardMap from "../Map/MainCardMap";

const DUMMY_BADGES = [
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
];

const MainCard = () => {
  const navigate = useNavigate();

  // 작은 글자 스타일
  const smallTextStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: 16,
    color: "#53AF7B",
    fontWeight: "bold",
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        borderRadius: 25,
        width: "100%",
        backgroundColor: "#E4F6ED",
        padding: 20,
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          css={{
            width: 40,
            height: 40,
            borderRadius: "100%",
            border: "3px solid #53AF7B",
            overflow: "hidden",
            marginRight: 5,
          }}
        >
          <img
            src="/images/dummyUserImage.png"
            alt="프로필 사진"
            css={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          css={{
            fontSize: 22,
            color: "#53AF7B",
            fontWeight: 600,
          }}
        >
          여러분과함께라면행복해
        </div>
      </div>
      <div css={{ ...smallTextStyle, whiteSpace: "nowrap", marginTop: 10 }}>
        <div css={{ marginRight: 5, marginTop: 5 }}>
          <img
            src="/images/main/flagIcon.png"
            alt="국기 아이콘"
            css={{ width: "24px", height: "24px" }}
          />
        </div>
        총탐험포인트
        <div css={{ width: "100%", marginLeft: 5, marginBottom: 18 }}>
          <ProgressBar progress={60} />
        </div>
      </div>
      <div css={{ ...smallTextStyle, marginTop: -12 }}>
        <div css={{ marginRight: 5, marginTop: 5 }}>
          <img
            src="/images/main/rankingIcon.png"
            alt="리뷰 아이콘"
            css={{ width: "24px", height: "24px" }}
          />
        </div>
        리뷰 26개
      </div>
      <div css={{ ...smallTextStyle }}>
        <div css={{ marginRight: 5, marginTop: 5 }}>
          <img
            src="/images/main/reviewIcon.png"
            alt="랭킹 아이콘"
            css={{ width: "24px", height: "24px" }}
          />
        </div>
        랭킹 5400위
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          height: 300,
          margin: "0 auto",
        }}
      >
        <MainCardMap />
      </div>
      <div
        css={{
          width: "100%",
          height: 30,
          backgroundColor: "#E4F6ED",
          marginTop: -25,
          zIndex: 1,
        }}
      ></div>
      <div onClick={() => navigate("/badgeList")}>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            color: "#53AF7B",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          <img
            src="/images/main/badgeIcon.png"
            alt="뱃지 아이콘"
            css={{ width: 18, height: 22, marginRight: 5 }}
          />
          뱃지
        </div>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 10,
            marginTop: 10,
          }}
        >
          {DUMMY_BADGES.map((badge, index) => (
            <img
              key={index}
              src={badge.imageUrl}
              alt={badge.badgeName}
              css={{ width: 56, aspectRatio: 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCard;
