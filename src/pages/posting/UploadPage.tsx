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

const UploadPage = () => {
  const navigate = useNavigate();
  const { setLoading, setLoadingMessage } = useLoading();
  const { postUploadData } = usePostingContext();

  const changeBlobToFile = async () => {
    if (postUploadData.post_image_url) {
      const blobUrl = postUploadData.post_image_url;

      const response = await fetch(blobUrl);
      const blob = await response.blob();

      const file = new File([blob], "image.jpg", {
        type: blob.type,
      });

      return file;
    }
  };

  const uploadImageToS3 = async (file: File) => {
    const AWSImageUrl = await uploadImage(file);

    console.log(AWSImageUrl);

    return AWSImageUrl;
  };

  const handleUploadPostClick = async () => {
    console.log(postUploadData);

    if (!postUploadData) {
      toast.error("게시글 작성에 실패했습니다.", {
        id: "upload-post-fail",
      });
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage("게시글 작성 중...");

      const file = await changeBlobToFile();

      const AWSImageUrl = await uploadImageToS3(file!);

      const response = await uploadPost({
        ...postUploadData,
        post_image_url: AWSImageUrl,
      });

      setLoading(false);

      toast.success("게시글이 작성되었습니다.", {
        id: "upload-post-success",
      });

      console.log(response.new_badges);

      if (response.new_badges.length > 0) {
        navigate("/getBadge", { state: { newBadges: response.new_badges } });
      } else {
        navigate("/posting_complete");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      if (
        error.response.status === 422 &&
        (postUploadData.post_star_rating === 0 ||
          postUploadData.post_description === "")
      ) {
        toast.error("별점과 리뷰는 필수 항목입니다.", {
          id: "upload-post-error",
        });
        return;
      }
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
            disabled={!postUploadData}
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
