/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import colors from "../../../../constants/colors";
import { RecentSearch } from "../../../../types/types";
import { useNavigate } from "react-router-dom";
import { LINK } from "../../../../constants/links";
import useRecentSearch from "../../../../hooks/search/useRecentSearch";

import RecentSearchItem from "./RecentSearchItem";
import B2 from "../../../UI/B2";
import NoSearchData from "../NoSearchData";

const RecentSearchesPanel = () => {
  const { recentSearchHistory } = useRecentSearch();
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h4>최근검색</h4>
        <B2
          onClick={() => navigate(LINK.EDIT_RECENT_SEARCH_PAGE)}
          css={{ color: colors.lightGrey, cursor: "pointer" }}
        >
          편집
        </B2>
      </Header>
      <SearchList>
        {recentSearchHistory.map((recentSearch: RecentSearch) => (
          <RecentSearchItem key={recentSearch.id} recentSearch={recentSearch} />
        ))}
        {recentSearchHistory.length === 0 && (
          <NoSearchData>최근 검색한 기록이 없습니다.</NoSearchData>
        )}
      </SearchList>
    </>
  );
};

export default RecentSearchesPanel;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchList = styled.ul`
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-top: 11px;
  border-top: 0.5px solid ${colors.paleGrey};
  overflow: auto;
  scrollbar-width: none;
  height: 100%;
`;
