/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import useSearchMap from "../../hooks/useSearchMap";
import styled from "@emotion/styled";
import { ExplorePageLayout } from "../../styles/styles";
import { useLocation } from "react-router-dom";

import SearchBar from "../../components/Search/SearchBar";
import TagButtonList from "../../components/Map/TagButtonList";
import SearchResultPanel from "../../components/Map/SearchResultPanel";
import RecentSearchesPanel from "../../components/Map/RecentSearchesPanel";

const SearchPage = () => {
  const { inputValue, handleSearchMap, setInputValue } = useSearchMap();
  const [isTyping, setIsTyping] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("query") ?? "";

  useEffect(() => {
    inputValue.length > 0 ? setIsTyping(true) : setIsTyping(false);
  }, [inputValue]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

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
        {isTyping ? <SearchResultPanel /> : <RecentSearchesPanel />}
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
