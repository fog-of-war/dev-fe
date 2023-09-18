/** @jsxImportSource @emotion/react */

import Notifications from "../components/Notifications/Notifications";

const NotificationsPage = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
