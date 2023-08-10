/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import SkeletonLoader from "../UI/SkeletonLoader";

const DUMMY_BOXES = [
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "고양이카페",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "냄셴테월",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "윤수와인바",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "동균버거",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "기가막힌경복궁",
  },
];

const RecommendLocation = () => {
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    new Array(DUMMY_BOXES.length).fill(true)
  );

  useEffect(() => {
    // 각 이미지의 로딩 상태를 체크하고 업데이트
    const imageLoadHandlers = DUMMY_BOXES.map((place, index) => {
      const image = new Image();
      image.src = place.imageUrl;

      const handleImageLoaded = () => {
        setLoadingStates((prevStates) => {
          const updatedStates = [...prevStates];
          updatedStates[index] = false;
          return updatedStates;
        });
      };

      image.onload = handleImageLoaded;
      return image;
    });

    return () => {
      // 컴포넌트 언마운트 시 이미지 로딩 핸들러 정리
      imageLoadHandlers.forEach((image) => {
        image.onload = null;
      });
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#53AF7B",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 20,
        }}
      >
        <img
          src="/images/main/markerIcon.png"
          alt="마커 아이콘"
          style={{ width: 16, height: 23, marginRight: 5 }}
        />
        탐험 추천
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginTop: 10,
        }}
      >
        {DUMMY_BOXES.map((place, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              backgroundImage: `url(${place.imageUrl})`,
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
              fontSize: "16px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 1)",
              fontWeight: 600,
              color: "#FFFFFF",
              aspectRatio: 1,
            }}
          >
            {loadingStates[index] ? (
              <SkeletonLoader width="100%" height="100%" />
            ) : (
              place.placeName
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecommendLocation;
