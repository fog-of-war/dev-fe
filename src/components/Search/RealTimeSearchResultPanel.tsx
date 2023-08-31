import { Place } from "../../types/types";
import { SearchList } from "../RecentSearch/RecentSearchesPanel";

import RealTimeSearchItem from "./RealTimeSearchItem";

const RealtimeSearchResultPanel = ({
  realtimeSearchResult,
}: {
  realtimeSearchResult: Place[];
}) => {
  return (
    <SearchList>
      {realtimeSearchResult.map((place: Place) => (
        <RealTimeSearchItem key={place.id} place={place} />
      ))}
    </SearchList>
  );
};

export default RealtimeSearchResultPanel;
