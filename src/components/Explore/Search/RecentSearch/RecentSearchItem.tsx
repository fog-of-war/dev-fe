import styled from "@emotion/styled";
import { RecentSearch } from "../../../../types/types";
import colors from "../../../../constants/colors";
import useRecentSearch from "../../../../hooks/search/useRecentSearch";
import useSearch from "../../../../hooks/search/useSearch";
import { useContext } from "react";
import { MapContext } from "../../../../context/MapContext";

import B1 from "../../../UI/B1";

interface RecentSearchItemProps {
  recentSearch: RecentSearch;
}

const RecentSearchItem = ({ recentSearch }: RecentSearchItemProps) => {
  const { searchQuery, type, place } = recentSearch;
  const { deleteRecentSearchHistory } = useRecentSearch();
  const { handleSearchAndRecent } = useSearch();
  const { handleMapMoveSelectedPlace } = useContext(MapContext);

  const handleSearchClick = () => {
    if (type === "keyword") {
      handleSearchAndRecent({ searchQuery, type });
    } else {
      handleMapMoveSelectedPlace(place!);
    }
  };

  return (
    <RecentSearchItemContainer>
      <SearchContentWrapper onClick={handleSearchClick}>
        <div>
          <img
            src={
              type === "keyword"
                ? "/images/search/searchIcon.png"
                : "/images/search/locationIcon.png"
            }
            alt="icon"
          />
        </div>
        <B1 css={{ fontWeight: "400", flexGrow: 1 }}>{searchQuery}</B1>
      </SearchContentWrapper>
      <DeleteButton onClick={() => deleteRecentSearchHistory(recentSearch)}>
        <img src="/images/search/xIcon.png" alt="icon" height={12} />
      </DeleteButton>
    </RecentSearchItemContainer>
  );
};

export default RecentSearchItem;

export const RecentSearchItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 0.5px solid ${colors.paleGrey};
  cursor: pointer;
`;

export const SearchContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-grow: 1;
  gap: 16px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;

    img {
      height: 20px;
    }
  }
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 20px;
  width: 20px;
`;
