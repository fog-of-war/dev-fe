/** @jsxImportSource @emotion/react */

import colors from "../../../../constants/colors";
import { RecentSearch } from "../../../../types/types";
import { useNavigate } from "react-router-dom";
import { LINK } from "../../../../constants/links";
import useRecentSearch from "../../../../hooks/search/useRecentSearch";
import { SearchList } from "../styles/Search.styles";

import RecentSearchItem from "./RecentSearchItem";
import B2 from "../../../UI/B2";
import NoSearchData from "../NoSearchData";
import SearchPannelHeader from "../SearchPannelHeader";

const RecentSearchesPanel = () => {
  const { recentSearchHistory } = useRecentSearch();
  const navigate = useNavigate();

  return (
    <>
      <SearchPannelHeader
        title="최근 검색"
        rightSlot={
          <B2
            onClick={() => navigate(LINK.EDIT_RECENT_SEARCH_PAGE)}
            css={{ color: colors.lightGrey, cursor: "pointer" }}
          >
            편집
          </B2>
        }
      />
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
