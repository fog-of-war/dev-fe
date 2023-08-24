/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import colors from "../../constants/colors";
import { useNavigate } from "react-router-dom";
import { Place } from "../../types/types";
import B1 from "../UI/B1";
import B2 from "../UI/B2";
import { useSetRecoilState } from "recoil";
import { mapViewAtomState, selectedPlaceAtom } from "../../store/mapAtom";

interface SearchItemProps {
  search: Place;
}

const SearchItem = ({ search }: SearchItemProps) => {
  const navigate = useNavigate();
  const setSelectedPlace = useSetRecoilState(selectedPlaceAtom);
  const setMapCenter = useSetRecoilState(mapViewAtomState);
  return (
    <SearchItemContainer>
      <SearchContentWrapper
        onClick={() => {
          setMapCenter({
            center: {
              lat: +search.y,
              lng: +search.x,
            },
            zoom: 18,
          });
          setSelectedPlace(search.place_name);
          navigate(`/search/result?query=${search.place_name}`);
        }}
      >
        <DistanceWrapper>
          <img src={"/images/search/locationIcon.png"} alt="icon" />
          <span css={{ fontWeight: "400", fontSize: 12 }}>
            {(+search.distance / 1000).toFixed(1)}km
          </span>
        </DistanceWrapper>
        <PlaceDataWrapper>
          <B1 css={{ fontWeight: "500", flexGrow: 1 }}>{search.place_name}</B1>
          <B2 css={{ fontWeight: "400", color: colors.lightGrey }}>
            {search.address_name}
          </B2>
        </PlaceDataWrapper>
      </SearchContentWrapper>
    </SearchItemContainer>
  );
};

export default SearchItem;

export const SearchItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 0.5px solid ${colors.paleGrey};
  cursor: pointer;
  height: fit-content;
`;

export const SearchContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-grow: 1;
  gap: 16px;

    img {
      height: 20px;
    }
  }
`;

const DistanceWrapper = styled.div`
  display: flex;
  gap: 1px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlaceDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
