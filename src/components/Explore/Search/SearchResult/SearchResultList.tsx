import styled from "@emotion/styled";
import { Place } from "../../../../types/types";
import { useContext } from "react";
import { MapContext } from "../../../../context/MapContext";
import useSearchPlace from "../hooks/useSearchPlace";

import PlaceItem from "../../../Place/PlaceItem";
import Map from "../../Map/GoogleMap";
import NoSearchData from "../NoSearchData";
import { CurrentLocationType } from "../../../../store/currentLocationAtom";

interface SearchResultListProps {
  searchQuery: string;
  currentLocation: CurrentLocationType;
}

const SearchResultList = ({
  searchQuery,
  currentLocation,
}: SearchResultListProps) => {
  const { isMapView } = useContext(MapContext);

  const { searchResult } = useSearchPlace({
    query: searchQuery,
    coordinates: {
      x: currentLocation.lng,
      y: currentLocation.lat,
    },
  });

  return (
    <>
      <Map places={searchResult} />
      {!isMapView && (
        <PlaceList>
          {searchResult?.map((place: Place) => (
            <PlaceItem key={place.id} place={place} displayAmount={3} />
          ))}
          {searchResult?.length === 0 && <NoSearchData />}
        </PlaceList>
      )}
    </>
  );
};

export default SearchResultList;

const PlaceList = styled.ul`
  position: absolute;
  inset: 0;
  padding: 90px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
