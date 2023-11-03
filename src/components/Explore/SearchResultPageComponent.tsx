import { useRecoilValue } from "recoil";
import { currentLocationAtom } from "../../store/currentLocationAtom";
import { SearchPageLayout as SearchResultPageLayout } from "./Search/styles/Search.styles";

import AsyncBoundary from "../Common/AsyncBoudary";
import SearchResultBar from "./Search/SearchResult/SearchResultBar";
import SearchResultList from "./Search/SearchResult/SearchResultList";
import LoadingSpinner from "../UI/LoadingSpinner";

interface SearchResultPageComonentProps {
  searchQuery: string;
}

/** 검색결과 페이지 컴포넌트 */
const SearchResultPageComponent = ({
  searchQuery,
}: SearchResultPageComonentProps) => {
  const currentLocation = useRecoilValue(currentLocationAtom);

  return (
    <SearchResultPageLayout>
      <SearchResultBar searchQuery={searchQuery} />
      <AsyncBoundary>
        {currentLocation ? (
          <SearchResultList
            searchQuery={searchQuery}
            currentLocation={currentLocation}
          />
        ) : (
          <LoadingSpinner />
        )}
      </AsyncBoundary>
    </SearchResultPageLayout>
  );
};

export default SearchResultPageComponent;
