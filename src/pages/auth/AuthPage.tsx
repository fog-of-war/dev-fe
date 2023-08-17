/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

import Spacing from "../../components/UI/Spacing";
import { useEffect } from "react";
import { axiosBase } from "../../api/axios";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../store/tokenAtom";
import { useNavigate } from "react-router-dom";

const OAUTH_ICONS = [
  { name: "google", icon: "/images/auth/googleIcon.png" },
  { name: "kakao", icon: "/images/auth/kakaoIcon.png" },
  { name: "naver", icon: "/images/auth/naverIcon.png" },
];

const AuthPage = () => {
  const setToken = useSetRecoilState(tokenState);

  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLDivElement>) => {
    const oAuthName = e.currentTarget.id;

    // OAuth 제공자의 로그인 페이지로 리다이렉션
    window.location.href = `${process.env.REACT_APP_API_URL}v1/auth/${oAuthName}`;
  };

  const handleAccessToken = async (code: string) => {
    // 백엔드 서버로 인증 코드를 보내어 액세스 토큰 교환
    try {
      const response = await axiosBase.post(`v1/auth/google/tokenplease`, {
        code,
      });
      const accessToken = response.data;
      setToken({ accessToken });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    // URL 파라미터를 파싱하여 인증 코드와 state 값을 얻음
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log(urlParams);

    if (code) {
      handleAccessToken(code!);
      // navigate("/profile_setup");
    }
  }, []);

  return (
    <ImageCoveredLayout>
      <Container>
        <AppTitle>Fog of War</AppTitle>
        <Spacing size={45} direction="vertical" />
        <StyledText>SNS계정으로 간편하게 회원가입</StyledText>
        <Spacing size={20} direction="vertical" />
        <AuthButtonWrapper>
          {OAUTH_ICONS.map((oAuth) => (
            <div
              key={oAuth.name}
              id={oAuth.name}
              onClick={(e) => handleLogin(e)}
              css={{ cursor: "pointer" }}
            >
              <img src={oAuth.icon} alt={oAuth.name} height={65} />
            </div>
          ))}
        </AuthButtonWrapper>
      </Container>
    </ImageCoveredLayout>
  );
};

export default AuthPage;

const ImageCoveredLayout = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  background-image: url("/images/mainImage.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  z-index: 65;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  gap: 24;
  margin-bottom: 30%;
`;

const AppTitle = styled.h1`
  font-family: "Cooper Std Black", sans-serif;
  font-weight: black;
  font-size: 50px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const AuthButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledText = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
