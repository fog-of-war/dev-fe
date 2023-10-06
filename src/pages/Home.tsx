/** @jsxImportSource @emotion/react */

import MainCard from "../components/Main/MainCard";
import RecommendLocation from "../components/Main/RecommendLocation";

const Home = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 15,
      }}
    >
      <MainCard />
      <RecommendLocation />
    </div>
  );
};

export default Home;
