import { Search } from "../../types/types";
import {
  SearchContentWrapper,
  RecentSearchItemContainer,
} from "./RecentSearchItem";

import B1 from "../UI/B1";

interface EditSearchItemProps {
  isSelected: boolean;
  search: Search;
  handleClick: (search: Search) => void;
}

const EditSearchItem = ({
  isSelected,
  search,
  handleClick,
}: EditSearchItemProps) => {
  return (
    <RecentSearchItemContainer onClick={() => handleClick(search)}>
      <SearchContentWrapper>
        <div>
          <img
            src={
              isSelected
                ? "/images/search/checkIcon.png"
                : "/images/search/uncheckIcon.png"
            }
            alt="icon"
          />
        </div>
        <B1 css={{ fontWeight: "400" }}>{search.search}</B1>
      </SearchContentWrapper>
    </RecentSearchItemContainer>
  );
};

export default EditSearchItem;
