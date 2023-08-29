/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import colors from "../../constants/colors";
import { Place } from "../../types/types";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

import B1 from "../UI/B1";
import B2 from "../UI/B2";

interface SearchItemProps {
  place: Place;
}

const RealTimeSearchItem = ({ place }: SearchItemProps) => {
  const { handleMoveSelectedPlace } = useContext(MapContext);

  return (
    <SearchItemContainer>
      <SearchContentWrapper
        onClick={() => {
          handleMoveSelectedPlace(place);
        }}
      >
        <DistanceWrapper>
          <img src={"/images/search/locationIcon.png"} alt="icon" />
          <span css={{ fontWeight: "400", fontSize: 12 }}>
            {(+place.distance / 1000).toFixed(1)}km
          </span>
        </DistanceWrapper>
        <PlaceDataWrapper>
          <B1 css={{ fontWeight: "500", flexGrow: 1 }}>{place.place_name}</B1>
          <B2 css={{ fontWeight: "400", color: colors.lightGrey }}>
            {place.address_name}
          </B2>
        </PlaceDataWrapper>
      </SearchContentWrapper>
    </SearchItemContainer>
  );
};

export default RealTimeSearchItem;

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
  cursor: pointer;

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
