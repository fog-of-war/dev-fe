/** @jsxImportSource @emotion/react */

import IconButton from "../../components/UI/IconButton";

const AuthPage = () => {
  return (
    <div
      css={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url("/images/mainImage.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        zIndex: 65,
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
          gap: 24,
          marginBottom: "30%",
        }}
      >
        <h1
          css={{
            fontFamily: `"Cooper Std Black", sans-serif`,
            fontWeight: "black",
            fontSize: "45px",
            textShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
          }}
        >
          Fog of War
        </h1>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <p
            css={{
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            SNS계정으로 간편하게 회원가입
          </p>
          <div
            css={{
              display: "flex",
              gap: 12,
            }}
          >
            <IconButton icon="/images/auth/googleIcon.png" onClick={() => {}} />
            <IconButton icon="/images/auth/kakaoIcon.png" onClick={() => {}} />
            <IconButton icon="/images/auth/naverIcon.png" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
