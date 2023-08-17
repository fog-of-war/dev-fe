/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import colors from "../../constants/colors";
import { useCroppedImage } from "../../context/CropImageContext";

const UploadPostImage = () => {
  const { croppedImage } = useCroppedImage();

  return (
    <div css={LayoutContainer}>
      {croppedImage ? (
        <img
          src={croppedImage}
          alt="CroppedImage"
          css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <p
          css={{
            color: colors.primary,
            fontSize: "14px",
          }}
        >
          선택된 이미지가 없습니다.
        </p>
      )}
    </div>
  );
};

export default UploadPostImage;

const LayoutContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1;
  /* border: 1px solid ${colors.primary}; */
  overflow: hidden;
  background-color: ${colors.paleGrey};
`;
