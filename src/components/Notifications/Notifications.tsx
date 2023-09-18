/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import colors from "../../constants/colors";
import NoticeNotifications from "./NoticeNotifications";
import ActivityNotifications from "./ActivityNotifications";
import B2 from "../UI/B2";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("활동");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <B2
          onClick={() => handleTabClick("활동")}
          style={{
            cursor: "pointer",
            color: activeTab === "활동" ? colors.primary : colors.mediumGrey,
            flex: "1",
            textAlign: "center",
            borderBottom:
              activeTab === "활동"
                ? `2px solid ${colors.primary}`
                : `1px solid ${colors.paleGrey}`,
          }}
        >
          활동 알림
        </B2>
        <B2
          onClick={() => handleTabClick("공지")}
          style={{
            cursor: "pointer",
            color: activeTab === "공지" ? colors.primary : colors.mediumGrey,
            flex: "1",
            textAlign: "center",
            borderBottom:
              activeTab === "공지 "
                ? `2px solid ${colors.primary}`
                : `1px solid ${colors.paleGrey}`,
          }}
        >
          공지사항
        </B2>
      </div>
      <div css={{ display: "flex" }}>
        <div
          css={{
            display: activeTab === "활동" ? "block" : "none",
          }}
        >
          <ActivityNotifications />
        </div>
        <div
          css={{
            display: activeTab === "공지" ? "block" : "none",
          }}
        >
          <NoticeNotifications />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
