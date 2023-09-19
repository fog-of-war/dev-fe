/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { ExplorePageLayout } from "../../styles/styles";
import { toast } from "react-hot-toast";

import SearchBar from "./SearchBar";
import TagButtonList from "../Map/TagButtonList";
import RealtimeSearchResultPanel from "./RealTimeSearchResultPanel";
import RecentSearchesPanel from "../RecentSearch/RecentSearchesPanel";
import useSearch from "../../hooks/search/useSearch";
import AsyncBoundary from "../Common/AsyncBoudary";

interface SearchPageComonentProps {
  searchQuery: string;
}

const SearchPageComponent = ({ searchQuery }: SearchPageComonentProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  // 검색창에 입력된 검색어
  const [inputValue, setInputValue] = useState("");

  // 검색창에 타이핑중인지 여부
  const [isTyping, setIsTyping] = useState(false);

  // 검색창에 입력된 검색어로 검색시 최근검색어에 추가 및 지도 좌표로 이동하는 함수
  const { handleSearchAndRecent } = useSearch();

  // 검색 창 엔터 이벤트 핸들러
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
