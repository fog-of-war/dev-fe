/** @jsxImportSource @emotion/react */

import UserProfile from "../components/ProfileCard/UserProfile";
import AdvPlaceList from "../components/AdventurePlace/AdvPlaceList";

const MyPage = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <UserProfile />
      <AdvPlaceList />
    </div>
  );
};

export default MyPage;
