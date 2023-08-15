/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { axiosBase } from "../../api/axios";

import IconButton from "../../components/UI/IconButton";
import Spacing from "../../components/UI/Spacing";
import { oAuthLogin } from "../../api/auth";

const OAUTH_ICONS = [
  { name: "google", icon: "/images/auth/googleIcon.png" },
  { name: "kakao", icon: "/images/auth/kakaoIcon.png" },
  { name: "naver", icon: "/images/auth/naverIcon.png" },
];

const AuthPage = () => {
  const navigate = useNavigate();

  const handleAuthButtonClick = async (
    e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    const oAuthName = e.currentTarget.id;
    const token = await oAuthLogin(oAuthName);
    console.log(token);

    // navigate("/profile_setup");
  };
  return (
    <ImageCoveredLayout>
      <Container>
        <AppTitle>Fog of War</AppTitle>
        <Spacing size={45} direction="vertical" />
        <StyledText>SNS계정으로 간편하게 회원가입</StyledText>
        <Spacing size={20} direction="vertical" />
        <AuthButtonWrapper>
          {OAUTH_ICONS.map((oAuth) => (
            <IconButton
              key={oAuth.name}
              icon={oAuth.icon}
              id={oAuth.name}
              onClick={handleAuthButtonClick}
            />
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
