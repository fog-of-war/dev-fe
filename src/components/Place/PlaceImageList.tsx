/** @jsxImportSource @emotion/react */

interface PlaceImageListProps {
  images: string[];
  displayAmount: 3 | 4;
}

const PlaceImageList = ({ images, displayAmount }: PlaceImageListProps) => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {images.slice(0, displayAmount).map((image) => (
        <div
          key={image}
          css={{
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
        </div>
      ))}
    </div>
  );
};

export default PlaceImageList;
