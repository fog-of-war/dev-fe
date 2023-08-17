/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCroppedImage } from "../context/CropImageContext";
import CropPageHeader from "../components/Certification/CropPageHeader";
import CropImage from "../components/Certification/CropImage";
import Button from "../components/UI/Button";
import { CropImagePageLayout } from "../styles/styles";
import { css } from "@emotion/react";
import { toast } from "react-hot-toast";

const CropImagePage = () => {
  const navigate = useNavigate();
  const [enableCropper, setEnalbeCropper] = useState<boolean>(false);
  const { croppedImage, setCroppedImage } = useCroppedImage();

  const handleCancleClick = () => {
    if (!croppedImage) {
      toast.error("선택된 이미지가 없습니다.", {
        id: "no-image-selected",
      });
      return;
    }

    setCroppedImage(null);
    setEnalbeCropper(true);
    toast.success("이미지 편집을 취소했습니다.", {
      id: "crop-cancle",
    });
  };

  const handleSelectClick = () => {
    if (!croppedImage) {
      toast.error("이미지를 선택해주세요.", {
        id: "image-not-selected",
      });
      return;
    }

    if (croppedImage) {
      navigate("/upload");
    }
  };

  return (
    <>
      <CropPageHeader />
      <CropImagePageLayout>
        <div css={CropImageContainer}>
          <CropImage
            enableCropper={enableCropper}
            setEnableCropper={setEnalbeCropper}
          />
        </div>
        <div
          css={{
            display: "flex",
            gap: "10px",
            width: "100%",
            marginTop: "auto",
          }}
        >
          <Button
            variant="secondary"
            onClick={handleCancleClick}
            css={{
              width: "100%",
            }}
          >
            취소
          </Button>
          <Button
            onClick={handleSelectClick}
            css={{
              width: "100%",
            }}
          >
            선택
          </Button>
        </div>
      </CropImagePageLayout>
    </>
  );
};

export default CropImagePage;

const CropImageContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  box-sizing: border-box;
`;
