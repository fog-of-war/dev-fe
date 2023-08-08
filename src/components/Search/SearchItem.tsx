import styled from "@emotion/styled";
import { Search } from "../../types/types";
import colors from "../../constants/colors";

import B1 from "../UI/B1";

interface SearchItemProps {
  search: Search;
  handleSearchDelete: () => void;
}

const SearchItem = ({ search, handleSearchDelete }: SearchItemProps) => {
  return (
    <SearchItemContainer key={search.id}>
      <IconContainer>
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
      </IconContainer>
      <DeleteButton onClick={handleSearchDelete}>
        <img src="/images/search/xIcon.png" alt="icon" height={12} />
      </DeleteButton>
    </SearchItemContainer>
  );
};

export default SearchItem;

const SearchItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid ${colors.lightGrey};
`;

const IconContainer = styled.div`
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
