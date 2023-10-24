/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import colors from "../../constants/colors";
import { EditProfileData } from "../../pages/ProfileEditPage";

interface TitleDropdownProps {
  userBadges :any[];
  titles: string[];
  selectedTitle: string;
  onSelectTitle: (newTitle: string) => void;
  setEditProfileData:React.Dispatch<React.SetStateAction<EditProfileData>>;
}

const TitleDropdown: React.FC<TitleDropdownProps> = ({
  userBadges,
  titles,
  selectedTitle,
  onSelectTitle,
  setEditProfileData
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleTitleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTitleSelect = (newTitle: string) => {
    onSelectTitle(newTitle);
    setIsDropdownOpen(false);
    const result = userBadges.filter(item => item.badge_name === newTitle)[0]
    setEditProfileData((prevData) => ({
      ...prevData,
      user_selected_badge: result, 
    }));
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
          borderColor: "#aaa",
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
            borderBottom: isDropdownOpen?  "1px solid #53AF7B" : "1px solid #aaa" ,
            margin:"0 0 6px",
            padding: "6px 0",
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
              border: "0px solid #53AF7B",
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
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
            }}
          >
            {titles.map((title) => (
              <li
                key={title}
                onClick={() => handleTitleSelect(title)}
                css={{
                  padding: "12px 12px",
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
