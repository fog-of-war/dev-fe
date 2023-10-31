import { useRecoilValue } from "recoil";
import { currentLocationAtom } from "../../store/currentLocationAtom";
import { ExplorePageLayout } from "./Explore.styles";

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
    <ExplorePageLayout>
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
    </ExplorePageLayout>
  );
};

export default SearchResultPageComponent;
