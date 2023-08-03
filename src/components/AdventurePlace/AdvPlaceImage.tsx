/** @jsxImportSource @emotion/react */
import { useState } from "react";
import colors from "../../constants/colors";

interface AdvPlaceImageProps {
  imageUrl: string;
  placeName: string;
}

const AdvPlaceImage = ({ imageUrl, placeName }: AdvPlaceImageProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
          borderRadius: "10px",
          display: isLoading ? "block" : "none",
        }}
      />
      {!isLoading && (
        <div
          css={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            border: "1px solid #d0d0d0",
            backgroundColor: "#f2f2f2",
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, #e0e0e0, transparent)`,
              animation: "loading 1.5s infinite",
            },
            "@keyframes loading": {
              "0%": { left: "-100%" },
              "100%": { left: "100%" },
            },
          }}
        />
      )}
    </div>
  );
};

export default AdvPlaceImage;
