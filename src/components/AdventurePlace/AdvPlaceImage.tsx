/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import SkeletonLoader from "../UI/SkeletonLoader";
import { PostUploadData, PlaceData } from "../../types/types";

interface AdvPlaceImageProps {
  post_image_url: PostUploadData["post_image_url"];
  place_name: PlaceData["place_name"];
}

const AdvPlaceImage = ({ post_image_url, place_name }: AdvPlaceImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(place_name);

  return (
    <ImageContainer>
      <ImageText>{place_name}</ImageText>
      <Image
        src={post_image_url}
        alt={`${place_name}`}
        onLoad={() => setIsLoading(true)}
        isLoading={isLoading}
      />
      {!isLoading && <SkeletonLoader width="100%" height="100%" />}
    </ImageContainer>
  );
};

export default AdvPlaceImage;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ImageText = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px;
`;

const Image = styled.img<{ isLoading: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  display: ${(props) => (props.isLoading ? "block" : "none")};
`;
