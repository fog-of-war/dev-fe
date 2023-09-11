/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

interface PlaceImagesProps {
  images: string[];
  onClick: () => void;
}

const PlaceImages = ({ images, onClick }: PlaceImagesProps) => {
  const hasImages = images.length > 0;

  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        gap: 6,
        width: "100%",
      }}
    >
      {hasImages ? (
        <div
          css={{
            flex: 1,
            position: "relative",
            paddingTop: "50%",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <img
            src={images[0]}
            alt="사진"
            css={{
              position: "absolute",
              width: "100%",
              height: "100%",
              inset: 0,
              objectFit: "cover",
            }}
          />
        </div>
      ) : (
        <div
          css={{
            flex: 1,
            position: "relative",
            paddingTop: "50%",
            borderRadius: 10,
            overflow: "hidden",
            background: "linear-gradient(to bottom, #c3c3c3, #fff)",
          }}
        >
          <img
            src="/images/certificationModal/explorerIcon.png"
            alt="탐험아이콘"
            css={{
              position: "absolute",
              width: "70%",
              height: "70%",
              inset: "15%",
              objectFit: "contain",
            }}
          />
        </div>
      )}
      {images.length === 0 && (
        <h2
          css={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: colors.primary,
          }}
        >
          이 장소의 <br />
          첫번째 탐험자가 <br />
          되어 보세요!
        </h2>
      )}
      {hasImages && (
        <div
          css={{
            flex: 1,
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
          }}
        >
          {images.slice(1, 5).map((image, i) => (
            <div
              key={i}
              css={{
                position: "relative",
                paddingTop: "50%",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <img
                src={image}
                alt={image}
                css={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  inset: 0,
                  objectFit: "cover",
                }}
              />
              {i === 3 && (
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "absolute",
                    color: "white",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    fontSize: 15,
                  }}
                  onClick={onClick}
                >
                  <img
                    src="/images/plusIcon.png"
                    alt="plus_icon"
                    width={14}
                    height={14}
                  />
                  더보기
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceImages;
