/** @jsxImportSource @emotion/react */
import React from "react";
import colors from "../../constants/colors";
import { css } from "@emotion/react";

interface TitleDropdownProps {
  titles: string[];
  selectedTitle: string;
  onSelectTitle: (newTitle: string) => void;
  defaultTitle: string; 
}

const TitleDropdown: React.FC<TitleDropdownProps> = ({
  titles,
  selectedTitle,
  onSelectTitle,
  defaultTitle, 
}) => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTitle = event.target.value;
    onSelectTitle(newTitle);
  };

  return (
    <div
      css={{
        width: "100%",
        display :"flex",
      flexDirection:"column",
        gap: "10px"
      }}
    >
      <span
        css={{
          fontSize: "16px",
          fontWeight: "bold",
          color: colors.accent,
          display : "block"
        }}
      >
        대표 칭호
      </span>
      <div 
        css={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            width: "100%",
            marginBottom: "6px",
            // borderBottom: isFocused
            //   ? `2px solid ${colors.primary}`
            //   : `1px solid ${colors.primary}`,
            borderColor: "#aaa",
            padding: "6px 0",
          }}>
      <select
        id="titleSelect"
        value={selectedTitle}
        onChange={handleTitleChange}
        css={{
          width: "100%",
          fontSize: "20px",
          color: colors.darkGrey,
          border: "none",
          outline: "none",
          marginBottom: "6px",
          borderBottom: "1px solid #53AF7B",
          borderColor: "#aaa",
          padding: "6px 0"
        }}
      >
        {/* <option value="">{defaultTitle}</option> */}
        {titles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};

export default TitleDropdown;
