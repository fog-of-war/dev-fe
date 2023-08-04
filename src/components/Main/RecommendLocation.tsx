/** @jsxImportSource @emotion/react */

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
          alignItems: "center",
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
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#FFFFFF",
              aspectRatio: 1,
            }}
          >
            {place.placeName}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecommendLocation;
