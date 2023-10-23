/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import colors from "../../constants/colors";

interface TitleDropdownProps {
  titles: string[];
  selectedTitle: string;
  onSelectTitle: (newTitle: string) => void;
}

const TitleDropdown: React.FC<TitleDropdownProps> = ({
  titles,
  selectedTitle,
  onSelectTitle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleTitleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTitleSelect = (newTitle: string) => {
    onSelectTitle(newTitle);
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
      }}
    >
      <span
        css={{
          fontSize: "16px",
          fontWeight: "bold",
          color: colors.accent,
          display: "block",
        }}
      >
        대표 칭호
      </span>
      <div
        css={{
          position: "relative",
          width: "100%",
          marginBottom: "6px",
          borderColor: "#aaa",
          padding: "6px 0",
        }}
      >
        <div
          onClick={handleTitleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            borderBottom: "1px solid #53AF7B",
            backgroundColor: isHovered ? "#f0f0f0" : "transparent",
          }}
        >
          <div
            css={{
              fontSize: "20px",
              color: colors.darkGrey,
            }}
          >
            {selectedTitle}
          </div>
          <div
            css={{
              width: "20px",
              height: "20px",
              border: "1px solid #53AF7B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: isDropdownOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        {isDropdownOpen && (
          <ul
            css={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              listStyle: "none",
              backgroundColor: "#fff",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              zIndex: 1,
            }}
          >
            {titles.map((title) => (
              <li
                key={title}
                onClick={() => handleTitleSelect(title)}
                css={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #aaa",
                }}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TitleDropdown;
