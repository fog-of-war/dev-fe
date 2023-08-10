/** @jsxImportSource @emotion/react */
import { useState } from "react";
import SkeletonLoader from "../UI/SkeletonLoader";

interface AdvPlaceImageProps {
  imageUrl: string;
  placeName: string;
}

const AdvPlaceImage = ({ imageUrl, placeName }: AdvPlaceImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div
      css={{
        width: "111px",
        height: "112px",
        display: "flex",
        flexWrap: "wrap",
        position: "relative",
      }}
    >
      <h1
        css={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          width: "100%",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 1)",
        }}
      >
        {placeName}
      </h1>
      <img
        src={imageUrl}
        alt={`${placeName}`}
        onLoad={() => setIsLoading(true)}
        css={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "20px",
          display: isLoading ? "block" : "none",
        }}
      />
      {!isLoading && <SkeletonLoader width="100%" height="100%" />}
    </div>
  );
};

export default AdvPlaceImage;
