/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import Modal from "../UI/Modal";

const NavigateModal = () => {
  return (
    <Modal css={{ width: "300px", padding: "30px 32px" }}>
      <div
        css={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2>지도 자세히 보기</h2>
        <img src="/images/xIcon.png" alt="close_button" height={22} />
      </div>
      <button
        css={{
          width: "100%",
          background: "#FEE500",
          border: "none",
          padding: "15px",
          borderRadius: "10px",
          color: colors.darkGrey,
        }}
      >
        <h4>카카오맵으로 열기</h4>
      </button>
      <button
        css={{
          width: "100%",
          background: "#2db400",
          border: "none",
          padding: "15px",
          borderRadius: "10px",
          color: "#fff",
        }}
      >
        <h4>네이버지도로 열기</h4>
      </button>
    </Modal>
  );
};

export default NavigateModal;
