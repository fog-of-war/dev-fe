/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import colors from "../../constants/colors";

interface PlaceImagesProps {
  images: string[];
  placeId: number[];
  onClick: () => void;
}

const PlaceImages = ({ images, placeId, onClick }: PlaceImagesProps) => {
  const hasImages = images.length > 0;

  const navigate = useNavigate(); // useNavigate 훅을 사용

  const handleImageClick = (placeId: number) => {
    // 이미지 클릭 시 reviewList/{placeId} 경로로 이동
    navigate(`/reviewList/${placeId}`);
  };

  // 이미지가 1장인 경우
  if (hasImages && images.length === 1) {
    return (
      <div
        css={{
          position: "relative",
          width: "100%",
        }}
      >
        <div
          css={{
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
            onClick={() => handleImageClick(placeId[0])}
          />
        </div>
      </div>
    );
  }

  // 이미지가 2장인 경우
  if (hasImages && images.length === 2) {
    return (
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          width: "100%",
        }}
      >
        {images.map((image, i) => (
          <div
            key={i}
            css={{
              position: "relative",
              paddingTop: "100%",
              borderRadius: 10,
              overflow: "hidden",
            }}
            onClick={() => handleImageClick(placeId[0])}
          >
            <img
              src={image}
              alt={`사진${i + 1}`}
              css={{
                position: "absolute",
                width: "100%",
                height: "100%",
                inset: 0,
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // 이미지가 3장인 경우
  if (hasImages && images.length === 3) {
    return (
      <div
        css={{
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          width: "100%",
        }}
      >
        <div
          css={{
            position: "relative",
            paddingTop: "50%",
            borderRadius: 10,
            overflow: "hidden",
          }}
          onClick={() => handleImageClick(placeId[0])}
        >
          <img
            src={images[0]}
            alt={`사진1`}
            css={{
              position: "absolute",
              width: "100%",
              height: "100%",
              inset: 0,
              objectFit: "cover",
            }}
          />
        </div>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 6,
          }}
        >
          {images.slice(1).map((image, i) => (
            <div
              key={i}
              css={{
                position: "relative",
                paddingTop: "50%",
                borderRadius: 10,
                overflow: "hidden",
              }}
              onClick={() => handleImageClick(placeId[0])}
            >
              <img
                src={image}
                alt={`사진${i + 2}`}
                css={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  inset: 0,
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 이미지가 4장인 경우
  if (hasImages && images.length === 4) {
    return (
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          width: "100%",
        }}
      >
        <div
          css={{
            position: "relative",
            paddingTop: "50%",
            borderRadius: 10,
            overflow: "hidden",
          }}
          onClick={() => handleImageClick(placeId[0])}
        >
          <img
            src={images[0]}
            alt={`사진1`}
            css={{
              position: "absolute",
              width: "100%",
              height: "100%",
              inset: 0,
              objectFit: "cover",
            }}
          />
        </div>
        <div
          css={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gap: 6,
          }}
        >
          <div
            css={{
              position: "relative",
              paddingTop: "50%",
              borderRadius: 10,
              overflow: "hidden",
            }}
            onClick={() => handleImageClick(placeId[0])}
          >
            <img
              src={images[1]}
              alt={`사진2`}
              css={{
                position: "absolute",
                width: "100%",
                height: "100%",
                inset: 0,
                objectFit: "cover",
              }}
            />
          </div>
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
            }}
          >
            {images.slice(2, 4).map((image, i) => (
              <div
                key={i}
                css={{
                  position: "relative",
                  paddingTop: "100%",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
                onClick={() => handleImageClick(placeId[0])}
              >
                <img
                  src={image}
                  alt={`사진${i + 3}`}
                  css={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 이미지가 5장 이상인 경우
  if (hasImages && images.length >= 5) {
    return (
      <div
        css={{
          position: "relative",
          display: "flex",
          gap: 6,
          width: "100%",
        }}
      >
        <div
          css={{
            flex: 1,
            position: "relative",
            paddingTop: "50%",
            borderRadius: 10,
            overflow: "hidden",
          }}
          onClick={() => handleImageClick(placeId[0])}
        >
          <img
            src={images[0]}
            alt="사진1"
            css={{
              position: "absolute",
              width: "100%",
              height: "100%",
              inset: 0,
              objectFit: "cover",
            }}
          />
        </div>
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
              onClick={() => handleImageClick(placeId[0])}
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
      </div>
    );
  }

  // 이미지가 없는 경우
  if (!hasImages) {
    return (
      <div
        css={{
          position: "relative",
          width: "100%",
        }}
      >
        <div
          css={{
            position: "relative",
            paddingTop: "30%",
            borderRadius: 10,
            overflow: "hidden",
            background: colors.pastel,
          }}
        >
          <img
            src="/images/certificationModal/compass.png"
            alt="나침판 아이콘"
            css={{
              position: "absolute",
              width: 70,
              height: 70,
              inset: "40% 50%",
              transform: "translate(-50%, -50%)",
              objectFit: "contain",
            }}
          />
          <h3
            css={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#6C7E75",
              whiteSpace: "nowrap",
              marginBottom: 30,
            }}
          >
            이 장소의 첫번째 탐험자가 되어보세요!
          </h3>
        </div>
      </div>
    );
  }
  return null;
};

export default PlaceImages;
