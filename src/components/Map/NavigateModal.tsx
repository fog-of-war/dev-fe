/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

import Modal from "../UI/Modal";

interface NavigateModalProps {
  isOpen: boolean;
  onClose: () => void;
  kakaoPlaceUrl: string;
  naverPlaceUrl: string;
}

const NavigateModal = ({
  isOpen,
  onClose,
  kakaoPlaceUrl,
  naverPlaceUrl,
}: NavigateModalProps) => {
  return (
    <Modal isOpen={isOpen} css={{ width: "300px", padding: "30px 32px" }}>
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
        <div onClick={onClose} css={{ cursor: "pointer" }}>
          <img src="/images/xIcon.png" alt="close_button" height={22} />
        </div>
      </div>
      <button
        css={{
          width: "100%",
          background: "#FEE500",
          border: "none",
          padding: "15px",
          borderRadius: "10px",
          color: colors.darkGrey,
          cursor: "pointer",
        }}
        onClick={() => window.open(kakaoPlaceUrl, "_blank")}
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
          cursor: "pointer",
        }}
        onClick={() => window.open(naverPlaceUrl, "_blank")}
      >
        <h4>네이버지도로 열기</h4>
      </button>
    </Modal>
  );
};

export default NavigateModal;
