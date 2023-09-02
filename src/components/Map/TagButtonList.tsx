/** @jsxImportSource @emotion/react */

import { MapTag } from "../../types/types";
import { MAP_TAG_LIST } from "../../constants/tag";

import TagButton from "./TagButton";
import useSearch from "../../hooks/search/useSearch";
import styled from "@emotion/styled";

const TagButtonList = () => {
  const { handleSearchAndRecent } = useSearch();

  return (
    <TagButtonListWrapper>
      <TagButtonListContainer>
        {MAP_TAG_LIST.map((tag: MapTag) => (
          <TagButton
            key={tag.id}
            icon={tag.icon}
            onClick={() => {
              handleSearchAndRecent({ searchQuery: tag.name, type: "keyword" });
            }}
          >
            {tag.name}
          </TagButton>
        ))}
      </TagButtonListContainer>
    </TagButtonListWrapper>
  );
};

export default TagButtonList;

const TagButtonListWrapper = styled.div`
  width: calc(100% + 40px);
  margin: 0 -20px;
  display: flex;
  overflow-x: auto;
  padding: 2px 20px 2px 20px;
  z-index: 70;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagButtonListContainer = styled.ul`
  display: flex;
  gap: 9px;
  flex-wrap: nowrap;
`;
