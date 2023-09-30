/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { SearchBarLayout } from "../../../../styles/styles";
import { useNavigate } from "react-router-dom";

interface SearchBarDisplayProps {
  value?: string;
  isMap: boolean;
  placeholder?: string;
}

const SearchBarDisplay = ({
  value,
  isMap,
  placeholder,
}: SearchBarDisplayProps) => {
  const navigate = useNavigate();
  const url = value ? `/search?query=${value}` : "/search";

  return (
    <SearchBarDisplayLayout isMap={isMap} onClick={() => navigate(url)}>
      <img
        src="/images/searchIcon.png"
        alt="search_icon"
        css={{ height: 18 }}
      />
      <input
        type="text"
        value={value}
        readOnly
        placeholder={placeholder}
        css={{
          border: "none",
          outline: "none",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "20px",
          letterSpacing: "-0.5px",
          width: "100%",
          "&::placeholder": {
            color: "#aaa",
          },
        }}
      />
    </SearchBarDisplayLayout>
  );
};

export default SearchBarDisplay;

const SearchBarDisplayLayout = styled(SearchBarLayout)<{ isMap: boolean }>`
  ${(props) =>
    props.isMap
      ? "box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);"
      : "border: 1px solid #d9d9d9;"}
`;
