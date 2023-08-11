/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import UserProfile from "../components/ProfileCard/UserProfile";
import AdvPlaceList from "../components/AdventurePlace/AdvPlaceList";
import { useLoading } from "../context/LoadingContext";

const MyPage = () => {
  const { setLoading, setLoadingMessage } = useLoading();

  // 비동기 로직 처리
  const fetchData = async () => {
    // setLoadingMessage("정훈짱최고");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
