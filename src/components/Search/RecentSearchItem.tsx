import styled from "@emotion/styled";
import { Search } from "../../types/types";
import colors from "../../constants/colors";
import { useSetRecoilState } from "recoil";
import { searchState } from "../../store/searchAtom";
import { useNavigate } from "react-router-dom";

import B1 from "../UI/B1";

interface RecentSearchItemProps {
  search: Search;
}

const RecentSearchItem = ({ search }: RecentSearchItemProps) => {
  const setRecentSearches = useSetRecoilState(searchState);
  const navigate = useNavigate();

  const handleSearchDelete = () => {
    setRecentSearches((prev: Search[]) =>
      prev.filter((item) => item.id !== search.id)
    );
  };

  return (
    <RecentSearchItemContainer>
      <SearchContentWrapper
        onClick={() => navigate(`/search/result?query=${search.search}`)}
      >
        <div>
          <img
            src={
              search.type === "keyword"
                ? "/images/search/searchIcon.png"
                : "/images/search/locationIcon.png"
            }
            alt="icon"
          />
        </div>
        <B1 css={{ fontWeight: "400", flexGrow: 1 }}>{search.search}</B1>
      </SearchContentWrapper>
      <DeleteButton onClick={handleSearchDelete}>
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
