/** @jsxImportSource @emotion/react */

import TagButtonList from "../components/Map/TagButtonList";
import { ExplorePageLayout } from "../styles/styles";
import SearchBarDisplay from "../components/Search/SearchBarDisplay";

const ExplorePage = () => {
  return (
    <ExplorePageLayout>
      <div
        css={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundImage: "url(/garbage/map.png)",
          backgroundSize: "cover",
        }}
      />
      <SearchBarDisplay placeholder="어디로 떠나보실래요?" />
      <TagButtonList />
    </ExplorePageLayout>
  );
};

export default ExplorePage;
