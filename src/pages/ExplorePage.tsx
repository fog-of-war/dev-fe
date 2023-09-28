/** @jsxImportSource @emotion/react */

import { ExplorePageLayout } from "../styles/styles";

import TagButtonList from "../components/Map/TagButtonList";
import SearchBarDisplay from "../components/Search/SearchResult/SearchBarDisplay";
import Map from "../components/Map/GoogleMap";

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
