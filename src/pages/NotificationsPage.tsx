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
        backgroundColor: "white",
      }}
    >
      <NotificationsHeader />
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
