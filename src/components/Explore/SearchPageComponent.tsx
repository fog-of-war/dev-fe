/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { toast } from "react-hot-toast";
import useSearch from "../../hooks/search/useSearch";
import { ExplorePageLayout } from "./Explore.styles";

import SearchBar from "../Common/SearchBar";
import TagButtonList from "./Search/SearchTag/TagButtonList";
import AsyncBoundary from "../Common/AsyncBoudary";
import RealtimeSearchResultPanel from "./Search/RealTimeSearch/RealTimeSearchResultPanel";
import RecentSearchesPanel from "./Search/RecentSearch/RecentSearchesPanel";

interface SearchPageComonentProps {
  searchQuery: string;
}

const SearchPageComponent = ({ searchQuery }: SearchPageComonentProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { handleSearchAndRecent } = useSearch();

  const handleSearchByKeyboard = (
    e: React.KeyboardEvent<HTMLInputElement> & { isComposing: boolean }
  ) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      if (inputValue.trim().length === 0) {
        toast.error("검색어를 입력해주세요.");
        return;
      }
      handleSearchAndRecent({ searchQuery: inputValue, type: "keyword" });
    }
  };

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    !inputValue.length ? setIsTyping(false) : setIsTyping(true);
  }, [inputValue]);

  useEffect(() => {
    searchQuery && setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <ExplorePageLayout>
      <SearchBar
        inputValue={inputValue}
        onKeyDown={handleSearchByKeyboard}
        onChange={(e) => setInputValue(e.target.value)}
        ref={searchRef}
      />
      <TagButtonList />
      <SearchPannel>
        {isTyping ? (
          <AsyncBoundary>
            <RealtimeSearchResultPanel searchQuery={inputValue} />
          </AsyncBoundary>
        ) : (
          <RecentSearchesPanel />
        )}
      </SearchPannel>
    </ExplorePageLayout>
  );
};

export default SearchPageComponent;

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
