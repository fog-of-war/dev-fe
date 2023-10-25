/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import UserProfile from "../components/ProfileCard/UserProfile";
import AdvPlaceList from "../components/AdventurePlace/AdvPlaceList";
import PageHeader from "../components/UI/PageHeader";

const MyPage = () => {
  return (
    <>
      <PageHeader headerTitle="마이페이지" />
      <MyPageLayout>
        <UserProfile />
        <AdvPlaceList />
      </MyPageLayout>
    </>
  );
};

export default MyPage;

const MyPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 420px;
  height: 100%;
  padding: 20px;
  padding-top: 60px;
`;
