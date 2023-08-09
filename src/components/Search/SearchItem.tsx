import styled from "@emotion/styled";
import { Search } from "../../types/types";
import colors from "../../constants/colors";

import B1 from "../UI/B1";
import { useSetRecoilState } from "recoil";
import { searchState } from "../../store/searchAtom";

interface SearchItemProps {
  search: Search;
}

const SearchItem = ({ search }: SearchItemProps) => {
  const setRecentSearches = useSetRecoilState(searchState);

  const handleSearchDelete = () => {
    setRecentSearches((prev: Search[]) =>
      prev.filter((item) => item.id !== search.id)
    );
  };

  return (
    <SearchItemContainer>
      <SearchContentWrapper>
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
        <B1 css={{ fontWeight: "400" }}>{search.search}</B1>
      </SearchContentWrapper>
      <DeleteButton onClick={handleSearchDelete}>
        <img src="/images/search/xIcon.png" alt="icon" height={12} />
      </DeleteButton>
    </SearchItemContainer>
  );
};

export default SearchItem;

export const SearchItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 0.5px solid ${colors.paleGrey};
`;

export const SearchContentWrapper = styled.div`
  display: flex;
  align-items: center;
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
