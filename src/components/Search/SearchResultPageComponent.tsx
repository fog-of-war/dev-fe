/** @jsxImportSource @emotion/react */

import { ExplorePageLayout } from "../../styles/styles";

import SearchResultList from "./SearchResult/SearchResultList";
import AsyncBoundary from "../Common/AsyncBoudary";
import SearchResultBar from "./SearchResult/SearchResultBar";

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
