/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCroppedImage } from "../../context/CropImageContext";
import useConfirmModal from "../../hooks/useConfirmModal";
import CropPageHeader from "../../components/Certification/CropPageHeader";
import CropImage from "../../components/Certification/CropImage";
import Button from "../../components/UI/Button";
import { CropImagePageLayout } from "../../styles/styles";
import { css } from "@emotion/react";
import { toast } from "react-hot-toast";
import { MODAL_TYPES } from "../../types/types.d";

const CropImagePage = () => {
  const navigate = useNavigate();
  const [enableCropper, setEnalbeCropper] = useState<boolean>(false);
  const { croppedImage, setCroppedImage } = useCroppedImage();
  const { openModal, closeModal } = useConfirmModal();

  const handleCancleClick = () => {
    if (!croppedImage) {
      toast.error("선택된 이미지가 없습니다. ", {
        id: "no-image-selected",
      });
      return;
    }

    closeModal();
    setCroppedImage(null);
    setEnalbeCropper(true);
    toast.success("이미지 편집을 취소했습니다.", {
      id: "crop-cancle",
    });
    navigate(-1);
  };

  const handleCancleModal = () => {
    openModal({
      modalType: MODAL_TYPES.ALERT,
      modalProps: {
        title: "정말 취소하시겠어요?",
        content: "확인 클릭시 이미지 편집이 초기화됩니다.",
        confirmText: "확인",
        onConfirmHandler: handleCancleClick,
      },
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
            marginTop: "20px",
          }}
        >
          <Button
            variant="secondary"
            onClick={handleCancleModal}
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
  height: 100%;
  margin-top: 40px;
  box-sizing: border-box;
`;
