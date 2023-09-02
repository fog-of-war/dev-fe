/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import SkeletonLoader from "../UI/SkeletonLoader";

import { getLandmarks } from "../../api/place";

export interface LandmarkData {
  place_name: string;
  place_posts: {
    post_image_url: string;
  }[];
}

const RecommendLocation = () => {
  // 로딩 상태
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);

  // 랜드마크 데이터
  const [landmarks, setLandmarks] = useState<LandmarkData[]>([]);

  // 랜덤한 인덱스를 생성하는 함수
  const generateRandomIndexes = (max: number, count: number): number[] => {
    const indexes: number[] = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  // 랜드마크 데이터 불러오기
  useEffect(() => {
    getLandmarks().then((landmarksData: LandmarkData[]) => {
      const randomIndexes = generateRandomIndexes(landmarksData.length, 3); // 랜덤한 인덱스 생성
      const randomLandmarks = randomIndexes.map(
        (index) => landmarksData[index]
      ); // 선택된 랜드마크 추출
      setLandmarks(randomLandmarks);
    });
  }, []);

  // 이미지 로드 상태
  useEffect(() => {
    setLoadingStates(new Array(3).fill(true));

    // 이미지 로드 핸들러
    const imageLoadHandlers = landmarks.map((landmark, index) => {
      const image = new Image();
      image.src = "https://source.unsplash.com/random";

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
      imageLoadHandlers.forEach((image) => {
        image.onload = null;
      });
    };
  }, [landmarks]);

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
        {landmarks.map((landmark, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              backgroundImage: `url(${
                landmark.place_posts[landmark.place_posts.length - 1]
                  ?.post_image_url
              })`,
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
            ) : landmark.place_name.length > 6 ? (
              `${landmark.place_name.slice(0, 6)}...`
            ) : (
              landmark.place_name
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecommendLocation;
