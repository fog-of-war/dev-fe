/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import colors from "../../constants/colors";
import { EditProfileData } from "../../pages/ProfileEditPage";
import { css } from "@emotion/react";

interface TitleDropdownProps {
  userBadges :any[];
  titles: string[];
  selectedTitle: string;
  onSelectTitle: (newTitle: string) => void;
  setEditProfileData:React.Dispatch<React.SetStateAction<EditProfileData>>;
}

const TitleDropdown: React.FC<TitleDropdownProps> = ({
  // 실제 데이터 조작 props
  userBadges,
  setEditProfileData,
  // UI 조작 props
  titles,
  selectedTitle,
  onSelectTitle
}) => {


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleTitleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTitleSelect = (newTitle: string) => {
    onSelectTitle(newTitle);
    setIsDropdownOpen(false);
    // userBadges 에서 newTitle의 전체 객체를 찾아 전달
    const result = userBadges.filter(item => item.badge_name === newTitle)[0]
    // setEditProfileData 로 상위 state 에 변경된 상태 전달
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
      {/* lable */}
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
      {/*  */}
      {/* selector wrapper*/}
      <div
        css={{
          position: "relative",
          width: "100%",
          borderColor: "#aaa",

        }}
      >
        {/* selector 내 현재 선택한 칭호가 보이는 div */}
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
          {/* selector 내부 ∨*/}
          <div
            css={{
              width: "20px",
              height: "20px",
              border: "0px solid #53AF7B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: isDropdownOpen ? "rotate(180deg)" : "none", // 드롭다운이 열리면 ∧ 로 회전
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
        {/* selector 가 클릭되었을때 나타나는 dropdown*/}
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
            borderRadius: "0 0 10px 10px",
            overflowY: "scroll",
            height: "30vh",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "4px", // Chrome 및 Safari에서 둥글게 만들기
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#999", // Chrome 및 Safari에서 둥글게 만들기
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent", // Chrome 및 Safari에서 둥글게 만들기
            },
            scrollbarWidth: "thin", // Firefox에서 둥글게 만들기
            scrollbarColor: "#ccc transparent", // Firefox에서 둥글게 만들기
          }}
          >
            {titles.map((title, index) => (
              <li
                key={title}
                onClick={() => handleTitleSelect(title)}
                css={css`
                padding: 12px 12px;
                cursor: pointer;
                border-bottom-left-radius: ${index === titles.length - 1 ? '10px' : '0'};
                border-bottom-right-radius: ${index === titles.length - 1 ? '10px' : '0'};
                border-bottom: ${index === titles.length - 1 ?  '0': '1px solid rgba(0,0,0,0.1)'};
                &:hover: {
                  background-color: colors.accent, 
                }`}
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
