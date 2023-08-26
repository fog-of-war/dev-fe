import { Place } from "../../types/types";
import { SearchList } from "./RecentSearchesPanel";
import SearchItem from "./SearchItem";

const SearchResultPanel = ({ searchResult }: { searchResult: Place[] }) => {
  return (
    <SearchList>
      {searchResult.map((search: Place) => (
        <SearchItem key={search.id} search={search} />
      ))}
    </SearchList>
  );
};

export default SearchResultPanel;
