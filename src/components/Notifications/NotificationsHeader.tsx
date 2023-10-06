/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import Title from "../Title";
import BackButton from "../UI/BackButton";

const NotificationsHeader = () => {
  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭 시, 이전 페이지로 이동
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: "420px",
        height: "50px",
        position: "fixed",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 78,
        backgroundColor: "#fff",
      }}
    >
      <div
        css={{
          width: "10px",
          height: "20px",
          paddingLeft: "30px",
        }}
      >
        <BackButton onClick={handleBackButtonClick} />
      </div>
      <div>
        <Title text="알림" />
      </div>
      <div
        css={{
          paddingRight: "30px",
        }}
      />
    </div>
  );
};

export default NotificationsHeader;
