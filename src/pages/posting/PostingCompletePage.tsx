/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import colors from "../../constants/colors";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { UploadPageLayout } from "./UploadPage";

const PostingCompletePage = () => {
  const navigate = useNavigate();

  const handleGoToMainPage = () => {
    navigate("/");
  };

  return (
    <div css={UploadPageLayout}>
      <div></div>
      <div css={ContentBox}>
        <div css={ImageBox}>
          <img
            css={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src="/images/completeIcon.png"
            alt="complete_icon"
          />
        </div>
        <span css={Text}>게시글 작성 완료!</span>
      </div>
      <Button
        css={{
          width: "100%",
          height: "55px",
        }}
        size="large"
        onClick={handleGoToMainPage}
      >
        닫기
      </Button>
    </div>
  );
};

export default PostingCompletePage;

const ContentBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ImageBox = css`
  width: 145px;
  height: 145px;
  border-radius: 100%;
  overflow: hidden;
`;

const Text = css`
  font-size: 26px;
  font-weight: bold;
  color: ${colors.primary};
`;
