/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { SearchBarLayout } from "../../styles/styles";
import { useNavigate } from "react-router-dom";

interface SearchBarDisplayProps {
  value?: string;
  placeholder?: string;
}

const SearchBarDisplay = ({ value }: SearchBarDisplayProps) => {
  const navigate = useNavigate();
  const url = value ? `/search?query=${value}` : "/search";

  return (
    <SearchBarDisplayLayout onClick={() => navigate(url)}>
      <img
        src="/images/searchIcon.png"
        alt="search_icon"
        css={{ height: 18 }}
      />
      <input
        type="text"
        defaultValue={value}
        css={{
          border: "none",
          outline: "none",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "20px",
          letterSpacing: "-0.5px",
          flex: 1,
          "&::placeholder": {
            color: "#aaa",
          },
        }}
      />
    </SearchBarDisplayLayout>
  );
};

export default SearchBarDisplay;

const SearchBarDisplayLayout = styled(SearchBarLayout)`
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
`;
