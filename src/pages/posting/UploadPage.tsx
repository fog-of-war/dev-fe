/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import UploadPostPageHeader from "../../components/Certification/UploadPostPageHeader";
import UploadPostImage from "../../components/Certification/UploadPostImage";
import UploadPostComment from "../../components/Certification/UploadPostComment";
import Button from "../../components/UI/Button";
import { toast } from "react-hot-toast";
import { uploadPost } from "../../api/post";

export interface PostingData {
  place_name: string;
  post_star_rating: number;
  post_description: string;
  post_image_url: string;
  place_latitude: number;
  place_longitude: number;
}

const UploadPage = () => {
  const navigate = useNavigate();
  const { setLoading, setLoadingMessage } = useLoading();
  const [postingData, setPostingData] = useState<PostingData>({
    place_name: "",
    post_star_rating: 0,
    post_description: "",
    post_image_url: "",
    place_latitude: 0,
    place_longitude: 0,
  });

  const handleUploadPostClick = async () => {
    try {
      setLoading(true);
      setLoadingMessage("게시글 작성 중...");
      await uploadPost(postingData);

      setLoading(false);
      toast.success("게시글 작성에 성공했습니다.", {
        id: "upload-post-success",
      });
      navigate("/posting_complete");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("게시글 작성에 실패했습니다.", {
        id: "upload-post-fail",
      });
    }
  };

  return (
    <>
      <UploadPostPageHeader />
      <div css={UploadPageLayout}>
        <div css={PostingContainer}>
          <UploadPostImage
            postingData={postingData}
            setPostingData={setPostingData}
          />
          <UploadPostComment
            postingData={postingData}
            setPostingData={setPostingData}
          />
        </div>
        <div css={ButtonContainer}>
          <Button
            css={ButtonStyle}
            size="large"
            onClick={handleUploadPostClick}
          >
            게시글 작성
          </Button>
        </div>
      </div>
    </>
  );
};

export default UploadPage;

export const UploadPageLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 20px;
  gap: 20px;
  position: absolute;
  z-index: 77;
  background-color: white;
`;

const PostingContainer = css`
  flex: 1;
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 40px;
  align-items: center;
  flex-direction: column;
`;

const ButtonContainer = css`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const ButtonStyle = css`
  width: 100%;
  height: 55px;
`;
