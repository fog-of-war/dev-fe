/** @jsxImportSource @emotion/react */

import { ExplorePageLayout } from "../../styles/styles";

import AsyncBoundary from "../Common/AsyncBoudary";
import SearchResultBar from "./Search/SearchResult/SearchResultBar";
import SearchResultList from "./Search/SearchResult/SearchResultList";

interface SearchResultPageComonentProps {
  searchQuery: string;
}

/** 검색결과 페이지 컴포넌트 */
const SearchResultPageComponent = ({
  searchQuery,
}: SearchResultPageComonentProps) => {
  return (
    <ExplorePageLayout>
      <SearchResultBar searchQuery={searchQuery} />
      <AsyncBoundary>
        <SearchResultList searchQuery={searchQuery} />
      </AsyncBoundary>
    </ExplorePageLayout>
  );
};

export default SearchResultPageComponent;
