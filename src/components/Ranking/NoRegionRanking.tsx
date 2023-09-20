/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Button from "../UI/Button";
import colors from "../../constants/colors";
import { useNavigate } from "react-router-dom";

const NoRegionRanking = () => {
  const navigate = useNavigate();

  const handleGoToExplore = () => {
    navigate("/explore");
  };

  return (
    <NoRegionComponentLayout>
      <ImageContainer>
        <img
          src="/images/noRanking.png"
          alt="noRegionRank"
          css={{
            width: "80px",
            height: "80px",
            filter: "grayscale(100%)",
          }}
        />
      </ImageContainer>
      <TextAndButtonContainer>
        <NoRankInfoText>아직 랭킹 정보가 없어요</NoRankInfoText>
        <GrayStyledButton onClick={handleGoToExplore}>
          탐험 시작하러 가기
        </GrayStyledButton>
      </TextAndButtonContainer>
    </NoRegionComponentLayout>
  );
};

export default NoRegionRanking;

const NoRegionComponentLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
`;

const TextAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
`;

const NoRankInfoText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.mediumGrey};
  text-align: center;
`;

const GrayStyledButton = styled(Button)`
  background-color: ${colors.mediumGrey};
  border: 1px solid ${colors.mediumGrey};

  &:hover {
    background-color: ${colors.darkGrey};
    border: 1px solid ${colors.darkGrey};
  }
`;
