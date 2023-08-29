/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { MapTag } from "../../types/types";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import { useSetRecoilState } from "recoil";
import { searchState } from "../../store/searchAtom";

import TagButton from "./TagButton";

const DUMMY_DATA = [
  {
    id: 1,
    name: "미식",
    icon: "/images/mapTag/food.png",
  },
  {
    id: 2,
    name: "운동",
    icon: "/images/mapTag/exercise.png",
  },
  {
    id: 3,
    name: "미술관",
    icon: "/images/mapTag/art.png",
  },
  {
    id: 4,
    name: "역사",
    icon: "/images/mapTag/history.png",
  },
  {
    id: 5,
    name: "커피",
    icon: "/images/mapTag/cafe.png",
  },
];

const TagButtonList = () => {
  const navigate = useNavigate();
  const { setIsMapView, setSelectedPlace } = useContext(MapContext);

  return (
    <div
      css={{
        width: "calc(100% + 40px)",
        margin: "0 -20px",
        display: "flex",
        overflowX: "auto",
        padding: "2px 20px 2px 20px",
        zIndex: 70,
        position: "relative",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ul
        css={{
          display: "flex",
          gap: "9px",
          flexWrap: "nowrap",
        }}
      >
        {DUMMY_DATA.map((tag: MapTag) => (
          <TagButton
            key={tag.id}
            icon={tag.icon}
            onClick={() => {
              setSelectedPlace(null);
              setIsMapView(false);
              navigate(`/search/result?query=${tag.name}`);
            }}
          >
            {tag.name}
          </TagButton>
        ))}
      </ul>
    </div>
  );
};

export default TagButtonList;
