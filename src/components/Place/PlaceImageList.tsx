/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { PlacePost } from "../../types/types";

import B2 from "../UI/B2";

interface PlaceImageListProps {
  posts: PlacePost[];
  displayAmount: 3 | 4;
}

const PlaceImageList = ({ posts, displayAmount }: PlaceImageListProps) => {
  const navigate = useNavigate();

  const slicedPosts = posts?.slice(0, displayAmount) || [];

  return (
    <PlaceImageListContainer>
      {slicedPosts.length === 0
        ? [1, 2, 3, 4].slice(0, displayAmount).map((_, i) => (
            <PlaceImageWrapper displayAmout={displayAmount} key={i}>
              <PlaceImage
                src="/images/placeDefaultImage.png"
                alt="review_image"
              />
            </PlaceImageWrapper>
          ))
        : slicedPosts.map((post, i) => (
            <PlaceImageWrapper displayAmout={displayAmount} key={post.post_id}>
              <PlaceImage src={post.post_image_url} alt="review_image" />
              {i === displayAmount - 1 && (
                <MoreViewWrapper
                  onClick={() => navigate(`/reviewList/${post.post_place_id}`)}
                >
                  <MoreViewIcon
                    src="/images/place/cameraIcon.png"
                    alt="camera"
                  />
                  <MoreViewText>{posts?.length || 0}</MoreViewText>
                </MoreViewWrapper>
              )}
            </PlaceImageWrapper>
          ))}
    </PlaceImageListContainer>
  );
};

export default PlaceImageList;

const PlaceImageListContainer = styled.div`
  display: flex;
  alignitems: center;
  gap: 10px;
`;

const PlaceImageWrapper = styled.div<{ displayAmout: 3 | 4 }>`
  position: relative;
  flex-grow: 1;
  aspect-ratio: ${({ displayAmout }) => (displayAmout === 3 ? 4 / 3 : 1 / 1)};
  border-radius: 10px;
  background: #f3f3f3;
  overflow: hidden;
  max-width: ${({ displayAmout }) => (displayAmout === 3 ? "110px" : "25%")};
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MoreViewWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  alignitems: center;
  gap: 5px;
`;

const MoreViewIcon = styled.img`
  width: 15px;
  height: 15px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

const MoreViewText = styled(B2)`
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;
