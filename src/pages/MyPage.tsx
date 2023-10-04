/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import UserProfile from "../components/ProfileCard/UserProfile";
import AdvPlaceList from "../components/AdventurePlace/AdvPlaceList";

const MyPage = () => {
  return (
    <MyPageLayout>
      <UserProfile />
      <AdvPlaceList />
    </MyPageLayout>
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
`;
