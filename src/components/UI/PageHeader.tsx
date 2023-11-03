/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BackButton from "./BackButton";

interface PageHeaderProps {
  headerTitle: string;
  pageInfo?: number;
  iconButton?: boolean;
  onCompleteClick?: () => void;
}

const PageHeader = ({
  headerTitle,
  pageInfo,
  iconButton,
  onCompleteClick,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <PageHeaderLayout>
      <BackButtonWrapper>
        <BackButton onClick={handleBackButtonClick} />
      </BackButtonWrapper>
      <HeaderTitleContainer>
        <HeaderTitle>{headerTitle}</HeaderTitle>
        {pageInfo && <ReviewCount>({pageInfo})</ReviewCount>}
      </HeaderTitleContainer>
      {iconButton ? (
        <CompleteButtonWrapper onClick={onCompleteClick}>
          <CompleteButton
            src="/images/completeButton.png"
            alt="complete_button"
          />
        </CompleteButtonWrapper>
      ) : (
        <EmptyDiv />
      )}
    </PageHeaderLayout>
  );
};

export default PageHeader;

const PageHeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 420px;
  height: 50px;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 2;
`;

const BackButtonWrapper = styled.div`
  width: 10px;
  height: 20px;
  padding-left: 30px;
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 17px;
  font-weight: bold;
`;

const ReviewCount = styled.p`
  font-weight: bold;
`;

const EmptyDiv = styled.div`
  padding-right: 30px;
`;

const CompleteButtonWrapper = styled.div`
  position: relative;
  width: 25px;
  height: 17px;
  cursor: pointer;

  right: 25px;
`;

const CompleteButton = styled.img`
  width: 100%;
  height: 100%;
`;
