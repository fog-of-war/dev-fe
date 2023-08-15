/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import B2 from "../UI/B2";

interface PlaceImageListProps {
  images: string[];
  displayAmount: 3 | 4;
}

const PlaceImageList = ({ images, displayAmount }: PlaceImageListProps) => {
  const navigate = useNavigate();

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {images.slice(0, displayAmount).map((image, i) => (
        <div
          key={image}
          css={{
            position: "relative",
            flexGrow: 1,
            aspectRatio: displayAmount === 3 ? "4/3" : "1/1",
            borderRadius: "10px",
            background: "#f3f3f3",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt="review_image"
            css={{ width: "100%", objectFit: "cover" }}
          />
          {i === displayAmount - 1 && (
            <div
              onClick={() => navigate("/place/1")}
              css={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img
                src="/images/place/cameraIcon.png"
                alt="camera"
                height={15}
                css={{
                  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.50)",
                }}
              />
              <B2
                css={{
                  color: "#fff",
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.50)",
                }}
              >
                {images.length}
              </B2>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlaceImageList;
