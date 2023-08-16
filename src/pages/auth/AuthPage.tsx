/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import Spacing from "../../components/UI/Spacing";

const OAUTH_ICONS = [
  { name: "google", icon: "/images/auth/googleIcon.png" },
  { name: "kakao", icon: "/images/auth/kakaoIcon.png" },
  { name: "naver", icon: "/images/auth/naverIcon.png" },
];

const AuthPage = () => {
  return (
    <ImageCoveredLayout>
      <Container>
        <AppTitle>Fog of War</AppTitle>
        <Spacing size={45} direction="vertical" />
        <StyledText>SNS계정으로 간편하게 회원가입</StyledText>
        <Spacing size={20} direction="vertical" />
        <AuthButtonWrapper>
          {OAUTH_ICONS.map((oAuth) => (
            <Link
              key={oAuth.name}
              to={`${process.env.REACT_APP_API_URL}v1/auth/${oAuth.name}`}
            >
              <img src={oAuth.icon} alt={oAuth.name} height={65} />
            </Link>
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
