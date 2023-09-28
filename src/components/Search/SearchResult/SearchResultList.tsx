import styled from "@emotion/styled";
import { Place } from "../../../types/types";
import { useContext } from "react";
import { MapContext } from "../../../context/MapContext";
import useSearchPlace from "../hooks/useSearchPlace";

import PlaceItem from "../../Place/PlaceItem";
import Map from "../../Map/GoogleMap";

const SearchResultList = ({ searchQuery }: { searchQuery: string }) => {
  const { isMapView } = useContext(MapContext);
  const { searchResult } = useSearchPlace(searchQuery);

  return (
    <>
      <Map places={searchResult} />
      {!isMapView && (
        <PlaceList>
          {searchResult?.map((place: Place) => (
            <PlaceItem key={place.id} place={place} displayAmount={3} />
          ))}
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
