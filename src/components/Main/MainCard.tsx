/** @jsxImportSource @emotion/react */

import ProgressBar from "../ProgressBar";

const MainCard = () => {
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
        width: "95%",
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
      <div css={{ ...smallTextStyle, whiteSpace: "nowrap", marginTop: 15 }}>
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
      <div>
        <img
          src="/images/main/map.png"
          alt="맵"
          css={{ width: 344, height: 288 }}
        />
      </div>
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
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        <img
          src="/images/main/dummyBadge.png"
          alt="더미뱃지"
          css={{ width: 56, height: 56, gap: 10 }}
        />
        <img
          src="/images/main/dummyBadge.png"
          alt="더미뱃지"
          css={{ width: 56, height: 56, gap: 10 }}
        />
        <img
          src="/images/main/dummyBadge.png"
          alt="더미뱃지"
          css={{ width: 56, height: 56, gap: 10 }}
        />
        <img
          src="/images/main/dummyBadge.png"
          alt="더미뱃지"
          css={{ width: 56, height: 56, gap: 10 }}
        />
        <img
          src="/images/main/dummyBadge.png"
          alt="더미뱃지"
          css={{ width: 56, height: 56, gap: 10 }}
        />
      </div>
    </div>
  );
};

export default MainCard;
