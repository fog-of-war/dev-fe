/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Button from "../UI/Button";
import colors from "../../constants/colors";
import { useNavigate } from "react-router-dom";

interface NoRegionRankingInterface {
  text: string;
  image: string;
}

const NoDataComponent = ({ text, image }: NoRegionRankingInterface) => {
  const navigate = useNavigate();

  const handleGoToExplore = () => {
    navigate("/explore");
  };

  return (
    <NoRegionComponentLayout>
      <ImageContainer>
        <img
          src={image}
          alt="noRegionRank"
          css={{
            width: "80px",
            height: "80px",
            filter: "grayscale(100%)",
          }}
        />
      </ImageContainer>
      <TextAndButtonContainer>
        <NoRankInfoText>{text}</NoRankInfoText>
        <GrayStyledButton onClick={handleGoToExplore}>
          탐험 시작하러 가기
        </GrayStyledButton>
      </TextAndButtonContainer>
    </NoRegionComponentLayout>
  );
};

export default NoDataComponent;

const NoRegionComponentLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  background-color: ${colors.pastel};
  border-radius: 15px;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
`;

const TextAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  justify-content: center;
  align-items: center;
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
