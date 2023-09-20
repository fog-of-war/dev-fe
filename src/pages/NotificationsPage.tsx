/** @jsxImportSource @emotion/react */

import Notifications from "../components/Notifications/Notifications";
import NotificationsHeader from "../components/Notifications/NotificationsHeader";

const NotificationsPage = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "absolute",
        top: 60,
        overflowY: "auto",
        maxHeight: "calc(100vh - 130px)",
        // 스크롤바 숨기기
        "&::-webkit-scrollbar": {
          width: "0.5em",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
      }}
    >
      <NotificationsHeader />
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
