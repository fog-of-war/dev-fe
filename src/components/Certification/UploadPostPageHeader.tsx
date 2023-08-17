/** @jsxImportSource @emotion/react */
import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";
import { useCroppedImage } from "../../context/CropImageContext";

const UploadPostPageHeader = () => {
  const navigate = useNavigate();
  const { setCroppedImage } = useCroppedImage();

  const handleBackButtonClick = () => {
    setCroppedImage(null);
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
        zIndex: 1,
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
        <h1
          css={{
            fontSize: "18px",
            fontWeight: "400",
          }}
        >
          인증 게시글 작성
        </h1>
      </div>
      <div
        css={{
          paddingRight: "30px",
        }}
      />
    </div>
  );
};

export default UploadPostPageHeader;
