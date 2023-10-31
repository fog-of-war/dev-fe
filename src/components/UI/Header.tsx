/** @jsxImportSource @emotion/react */

import BackButton from "./BackButton";
import Title from "../Title";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
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
        <Title text={title} />
      </div>
      <div
        css={{
          paddingRight: "30px",
        }}
      />
    </div>
  );
};

export default Header;
