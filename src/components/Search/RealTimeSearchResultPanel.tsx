import { Place } from "../../types/types";
import { SearchList } from "../RecentSearch/RecentSearchesPanel";

import RealTimeSearchItem from "./RealTimeSearchItem";

const SearchResultPanel = ({ searchResult }: { searchResult: Place[] }) => {
  return (
    <SearchList>
      {searchResult.map((place: Place) => (
        <RealTimeSearchItem key={place.id} place={place} />
      ))}
    </SearchList>
  );
};

export default SearchResultPanel;
