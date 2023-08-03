/** @jsxImportSource @emotion/react */

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
      <div css={{ ...smallTextStyle, marginTop: 15 }}>
        <div css={{ marginRight: 5, marginTop: 5 }}>
          <img
            src="/images/main/flagIcon.png"
            alt="국기 아이콘"
            css={{ width: "24px", height: "24px" }}
          />
        </div>
        총탐험포인트
      </div>
      <div css={{ ...smallTextStyle }}>
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
    </div>
  );
};

export default MainCard;
