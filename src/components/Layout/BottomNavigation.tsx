/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import BottomNavIcon from "./BottomNavButton";

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <div
      css={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        maxWidth: "420px",
        height: 65,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 10px",
        zIndex: "50",
      }}
    >
      <BottomNavIcon
        onClick={() => navigate("/")}
        src="/images/homeIcon.png"
        alt="home"
      />
      <BottomNavIcon
        onClick={() => navigate("/explore")}
        src="/images/mapIcon.png"
        alt="map"
      />
      <BottomNavIcon
        onClick={() => navigate("/camera")}
        height={55}
        src="/images/cameraIcon.png"
        alt="home"
      />

      <BottomNavIcon
        onClick={() => navigate("/notifications")}
        src="/images/alarmIcon.png"
        alt="home"
      />
      <BottomNavIcon
        onClick={() => navigate("/profile")}
        src="/images/profileIcon.png"
        alt="home"
      />
    </div>
  );
};

export default BottomNavigation;
