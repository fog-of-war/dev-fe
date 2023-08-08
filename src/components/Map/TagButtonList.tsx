/** @jsxImportSource @emotion/react */

import { MapTag } from "../../types/types";
import TagButton from "./TagButton";

interface TagButtonListProps {
  tags: MapTag[];
}

const TagButtonList = ({ tags }: TagButtonListProps) => {
  return (
    <div
      css={{
        width: "calc(100% + 40px)",
        margin: "0 -20px",
        display: "flex",
        overflowX: "auto",
        padding: "2px 20px 2px 20px",
        zIndex: 1,
        position: "relative",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ul
        css={{
          display: "flex",
          gap: "9px",
          flexWrap: "nowrap",
        }}
      >
        {tags.map((tag: MapTag) => (
          <TagButton key={tag.id} icon={tag.icon} onClick={() => {}}>
            {tag.name}
          </TagButton>
        ))}
      </ul>
    </div>
  );
};

export default TagButtonList;
