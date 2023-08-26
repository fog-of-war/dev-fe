/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import useSearchMap from "../../hooks/useSearchMap";
import styled from "@emotion/styled";
import { ExplorePageLayout } from "../../styles/styles";
import { useLocation } from "react-router-dom";

import SearchBar from "../../components/Search/SearchBar";
import TagButtonList from "../../components/Map/TagButtonList";
import RecentSearchesPanel from "../../components/Search/RecentSearchesPanel";
import SearchResultPanel from "../../components/Search/SearchResultPanel";

const SearchPage = () => {
  const [isTyping, setIsTyping] = useState(false);
  const { searchResult, inputValue, handleSearchMap, setInputValue } =
    useSearchMap();

  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("query") ?? "";

  // 검색창에 타이핑중이면 true, 아니면 false
  useEffect(() => {
    inputValue.length > 0 ? setIsTyping(true) : setIsTyping(false);
  }, [inputValue]);

  // 컴포넌트가 마운트되면 검색창에 포커스
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // 검색쿼리가 있으면 검색창에 검색쿼리 입력
  useEffect(() => {
    if (searchQuery) {
      setInputValue(searchQuery);
    }
  }, [searchQuery, setInputValue]);

  return (
    <ExplorePageLayout>
      <SearchBar
        inputValue={inputValue}
        onKeyDown={handleSearchMap}
        onChange={(e) => setInputValue(e.target.value)}
        ref={searchRef}
      />
      <TagButtonList />
      <SearchPannel>
        {isTyping ? (
          <SearchResultPanel searchResult={searchResult} />
        ) : (
          <RecentSearchesPanel />
        )}
      </SearchPannel>
    </ExplorePageLayout>
  );
};

export default SearchPage;

const SearchPannel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 120px 20px 0px 20px;
  z-index: 65;
`;
