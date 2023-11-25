/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useCroppedImage } from "../../context/CropImageContext";
import { useImageContext } from "../../context/CertifiedImageContext";
import { usePostingContext } from "../../context/PostingDataContext";
import Button from "../../components/UI/Button";
import colors from "../../constants/colors";
import { toast } from "react-hot-toast";

type CropState = {
  enableCropper: boolean;
  setEnableCropper: React.Dispatch<React.SetStateAction<boolean>>;
};

const CropImage = ({ enableCropper, setEnableCropper }: CropState) => {
  const cropperRef = useRef<Cropper | null>(null);
  const { setCroppedImage } = useCroppedImage();
  // const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { certifiedImage } = useImageContext();
  const { setPostUploadData } = usePostingContext();

  const imageSrc = certifiedImage.imageURL;
  console.log(imageSrc);

  useEffect(() => {
    if (enableCropper && cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.enable();
    }
  }, [enableCropper]);

  // const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImageSrc(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const getCroppedImage = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.getCroppedCanvas().toBlob((blob: any) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          setCroppedImage(croppedImageUrl);
          cropper.disable();
          toast.success("이미지 자르기 성공!", {
            id: "crop-success",
          });

          // PostingData에 자른 이미지 url 및 장소 정보 저장
          setPostUploadData((prevData) => ({
            ...prevData,
            place_name: certifiedImage.place_name || "", // null인 경우 빈 문자열로 대체
            place_latitude: Number(certifiedImage.place_latitude || 0), // null인 경우 0으로 대체
            place_longitude: Number(certifiedImage.place_longitude || 0), // null인 경우 0으로 대체
            post_image_url: croppedImageUrl,
          }));

          console.log(certifiedImage.place_latitude);
          console.log(certifiedImage.place_longitude);
        }
      });
    }
  };

  return (
    <div css={Container}>
      {/* <label css={StyledLabel} htmlFor="fileInput">
        이미지 선택
      </label>
      <input
        css={StyledInput}
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      /> */}
      <div css={BoxStyle}>
        {imageSrc ? (
          <div css={CropperContainer}>
            <Cropper
              ref={cropperRef}
              src={imageSrc}
              aspectRatio={1}
              guides={true}
              background={false}
              zoomable={false}
              wheelZoomRatio={0}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
            />
          </div>
        ) : (
          <div css={PlaceholderStyle}>이미지를 선택하세요</div>
        )}
      </div>
      {imageSrc && (
        <Button
          css={CropButtonStyle}
          size="medium"
          onClick={() => {
            getCroppedImage();
            setEnableCropper(false);
          }}
        >
          자르기
        </Button>
      )}
    </div>
  );
};

export default CropImage;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const StyledInput = css`
  display: none;
`;

const StyledLabel = css`
  font-size: 13px;
  padding: 3px 9px;
  font-weight: 500;
  line-height: 18px;
  height: 26px;
  background-color: ${colors.primary};
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: "all .4s ease";
  position: absolute;
  bottom: -35px;
  right: 0px;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const BoxStyle = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* border: 1px solid ${colors.primary}; */
  margin-top: 20px;
  overflow: hidden;
  /* background-color: ${colors.paleGrey}; */
`;

const PlaceholderStyle = css`
  font-size: 14px;
  color: ${colors.secondary};
`;

const CropperContainer = css`
  width: 100%;
  height: 100%;
`;

const CropButtonStyle = css`
  position: absolute;
  bottom: -50px;
  right: 0px;
`;
