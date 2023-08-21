/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import UploadPostPageHeader from "../../components/Certification/UploadPostPageHeader";
import UploadPostImage from "../../components/Certification/UploadPostImage";
import UploadPostComment from "../../components/Certification/UploadPostComment";
import StarRating from "../../components/Posting/StarRating";
import Button from "../../components/UI/Button";
import { toast } from "react-hot-toast";
import { uploadPost } from "../../api/post";
import uploadImage from "../../api/aws";
import { usePostingContext } from "../../context/PostingDataContext";

export interface PostingData {
  place_name: string | null;
  post_star_rating: number | null;
  post_description: string | null;
  post_image_url: string | null;
  place_latitude: number | null;
  place_longitude: number | null;
}

const UploadPage = () => {
  const navigate = useNavigate();
  const { setLoading, setLoadingMessage } = useLoading();
  const { postingData, setPostingData } = usePostingContext();

  const changeBlobToFile = async (blob: any) => {
    if (postingData.post_image_url) {
      const blob = await fetch(postingData.post_image_url).then((res) =>
        res.blob()
      );

      const file = new File([blob], "image.jpg", {
        type: blob.type,
      });

      console.log(file);

      const AWSImageUrl = await uploadImage(file);

      console.log(AWSImageUrl);

      setPostingData((prevData) => ({
        ...prevData,
        post_image_url: AWSImageUrl,
      }));
    }
  };

  const handleUploadPostClick = async () => {
    if (!postingData) {
      toast.error("게시글 작성에 실패했습니다.", {
        id: "upload-post-fail",
      });
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage("게시글 작성 중...");

      await changeBlobToFile(postingData.post_image_url);

      await uploadPost(postingData);

      setLoading(false);
      toast.success("게시글 작성에 성공했습니다.", {
        id: "upload-post-success",
      });
      navigate("/posting_complete");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("게시글 작성중 에러가 발생했습니다.", {
        id: "upload-post-error",
      });
    }
  };

  return (
    <>
      <UploadPostPageHeader />
      <div css={UploadPageLayout}>
        <div css={PostingContainer}>
          <UploadPostImage />
          <StarRating />
          <UploadPostComment />
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
