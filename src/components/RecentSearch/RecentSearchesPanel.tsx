/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import colors from "../../constants/colors";
import { Search } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { LINK } from "../../constants/links";

import B2 from "../UI/B2";
import SearchItem from "./RecentSearchItem";
import useRecentSearch from "../../hooks/search/useRecentSearch";

const RecentSearchesPanel = () => {
  const { recentSearchHistory } = useRecentSearch();
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h4>최근검색</h4>
        <B2
          onClick={() => navigate(LINK.EDIT_RECENT_SEARCH_PAGE)}
          css={{ color: colors.lightGrey }}
        >
          편집
        </B2>
      </Header>
      <SearchList>
        {recentSearchHistory.map((search: Search) => (
          <SearchItem key={search.id} search={search} />
        ))}
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
`;
