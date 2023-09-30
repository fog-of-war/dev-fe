import { ExplorePageLayout } from "./Explore.styles";

import SearchBarDisplay from "./Search/SearchResult/SearchBarDisplay";
import TagButtonList from "./Search/SearchTag/TagButtonList";
import Map from "./Map/GoogleMap";

const ExplorePageComponent = () => {
  return (
    <ExplorePageLayout>
      <SearchBarDisplay placeholder="어디로 떠나보실래요?" isMap={true} />
      <TagButtonList />
      <Map />
    </ExplorePageLayout>
  );
};

export default ExplorePageComponent;
