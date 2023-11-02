/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BackButton from "./BackButton";

interface PageHeaderProps {
  headerTitle: string;
  props?: any;
}

const PageHeader = ({ headerTitle, ...props }: PageHeaderProps) => {
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
        {props && <ReviewCount>(props)</ReviewCount>}
      </HeaderTitleContainer>
      <EmptyDiv />
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
  font-weight: 400;
`;

const ReviewCount = styled.p``;

const EmptyDiv = styled.div`
  padding-right: 30px;
`;
