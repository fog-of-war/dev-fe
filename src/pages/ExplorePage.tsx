/** @jsxImportSource @emotion/react */

import { ExplorePageLayout } from "../styles/styles";

import TagButtonList from "../components/Explore/Search/SearchTag/TagButtonList";
import SearchBarDisplay from "../components/Explore/Search/SearchResult/SearchBarDisplay";
import Map from "../components/Explore/Map/GoogleMap";

const ExplorePage = () => {
  return (
    <ExplorePageLayout>
      <SearchBarDisplay placeholder="어디로 떠나보실래요?" isMap={true} />
      <TagButtonList />
      <Map />
    </ExplorePageLayout>
  );
};

export default ExplorePage;
