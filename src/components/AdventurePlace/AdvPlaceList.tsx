/** @jsxImportSource @emotion/react */
import colors from "../../constants/colors";
import AdvPlaceTitle from "./AdvPlaceTitle";
import AdvPlaceImage from "./AdvPlaceImage";
import PlaceTitle from "../Certification/PlaceTitle";

const DUMMY_PLACE = [
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "카페",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "냄셴테월",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "거시기와인바",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "머시기버거",
  },
  {
    imageUrl: "https://source.unsplash.com/random ",
    placeName: "경복궁",
  },
];

const AdvPlaceList = () => {
  return (
    <>
      <div
        css={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "350px",
          gap: 8,
        }}
      >
        <AdvPlaceTitle />
        {DUMMY_PLACE.map((place, index) => (
          <AdvPlaceImage
            key={index}
            imageUrl={place.imageUrl}
            placeName={place.placeName}
          />
        ))}
      </div>
    </>
  );
};

export default AdvPlaceList;
