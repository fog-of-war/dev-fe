/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { getCurrentUser, oAuthLogin } from "../../api/auth";
import { useEffect } from "react";
import useCheckProfileSetup from "../../hooks/useCheckProfileSetup";

import Spacing from "../UI/Spacing";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { setAccessTokenToStorage } from "../../utils/tokenStorage";

const OAUTH_ICONS = [
  { name: "google", icon: "images/auth/google.svg" },
  { name: "naver", icon: "/images/auth/naver.svg" },
];

const AuthPageComponent = () => {
  const { checkProfileSetupToNavigate } = useCheckProfileSetup();
  const { updateCurrentUser } = useAuth();

  /** OAuth 버튼 클릭 핸들러 */
  const handleClickOAuthButton = (e: React.MouseEvent<HTMLDivElement>) => {
    const oAuthName = e.currentTarget.id;

    window.location.href = `${process.env.REACT_APP_API_URL}v1/auth/${oAuthName}`;
  };

  const handleAuthentication = async (code: string, oAuthName: string) => {
    const response = await oAuthLogin(code, oAuthName);
    const accessToken = response.access_token;
    setAccessTokenToStorage(accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const currentUser = await getCurrentUser();
    updateCurrentUser(currentUser);
    checkProfileSetupToNavigate(currentUser);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const code = urlParams.get("code");

    if (code && provider) {
      handleAuthentication(code, provider);
    }
  }, []);

  return (
    <ImageCoveredLayout>
      <Container>
        <AppTitle>Fog of War</AppTitle>
        <Spacing size={45} direction="vertical" />
        <StyledText>SNS계정으로 간편하게 회원가입</StyledText>
        <Spacing size={45} direction="vertical" />
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
        <Disclaimer>
          <p>시작과 동시에 전장의 안개의 <a href="https://www.notion.so/sapienslee/Fog-of-War-Post-Management-Policy-61a8630cf0f045bab65d41259ee0270b">서비스 이용약관</a>, <a href="https://www.notion.so/sapienslee/Fog-of-War-Privacy-Policy-9fdfdfc23e234c5cb069a4660dbce5cb">개인정보 수집 및 이용</a>에 동의하게 됩니다.</p>
        </Disclaimer>
      </Container>
    </ImageCoveredLayout>
  );
};

export default AuthPageComponent;

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
  flex-direction:column;
  gap: 12px;
`;

const StyledText = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Disclaimer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0; 
  width: 100%;
  margin: 4px 4px 4px 4px; 
  // text-align: center;
  z-index: 100; 
  color: white; 
  padding: 8px; 
  & > p {
    width: 100%; // 너비를 뷰포트 너비의 30%로 설정합니다.
    margin: 0 auto; // 자동 마진을 사용하여 가운데 정렬합니다.
    word-wrap: break-word; // 긴 단어가 있을 경우 줄바뀜을 허용합니다.
    overflow-wrap: break-word; // 뷰포트 너비를 넘어가는 내용에 대해 단어를 나누어 줄바뀜을 허용합니다.
    a {
      color: inherit; // 부모 요소로부터 색상을 상속받습니다.
      // text-decoration: none; // 밑줄을 없앱니다.
    }
  }
`;
