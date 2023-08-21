/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { getCurrentUser, oAuthLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";

import Spacing from "../../components/UI/Spacing";

const OAUTH_ICONS = [
  { name: "google", icon: "/images/auth/googleIcon.png" },
  { name: "kakao", icon: "/images/auth/kakaoIcon.png" },
  { name: "naver", icon: "/images/auth/naverIcon.png" },
];

const AuthPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleClickOAuthButton = (e: React.MouseEvent<HTMLDivElement>) => {
    const oAuthName = e.currentTarget.id;

    // OAuth 제공자의 로그인 페이지로 리다이렉션
    window.location.href = `${process.env.REACT_APP_API_URL}v1/auth/${oAuthName}`;
  };

  const handleAuthentication = async (code: string, oAuthName: string) => {
    try {
      // 액세스 토큰을 받아 로컬 스토리지에 저장
      const accessToken = await oAuthLogin(code, oAuthName);
      localStorage.setItem("accessToken", JSON.stringify(accessToken));

      // 유저정보 요청 및 유저 캐시 업데이트
      const currentUser = await getCurrentUser();
      queryClient.setQueryData(["currentUser"], currentUser);

      // 유저 프로필 셋없이 안돼있으면 프로필 셋업 페이지로 이동 아니면 메인페이지로 이동
      if (
        currentUser &&
        (!currentUser?.user_nickname || !currentUser?.user_image_url)
      ) {
        navigate("/profile_setup");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    // URL 쿼리 파라미터에서 코드를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // 현재 URL에서 OAuth 제공자 이름을 필터링
    const currentUrl = window.location.href;
    const oAuthNAme = ["google", "kakao", "naver"].filter((oAuthName) =>
      currentUrl.includes(oAuthName)
    );

    if (code) {
      handleAuthentication(code!, oAuthNAme[0]);
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
              onClick={(e) => handleClickOAuthButton(e)}
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
