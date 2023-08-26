/** @jsxImportSource @emotion/react */

import { useLocation, useNavigate } from "react-router-dom";
import { ExplorePageLayout } from "../../styles/styles";
import styled from "@emotion/styled";
import { useState } from "react";

import SearchBarDisplay from "../../components/Search/SearchBarDisplay";
import PlaceItem from "../../components/Place/PlaceItem";
import Map from "../../components/Map/GoogleMap";
import useMapSearchQuery from "../../hooks/useMapSearchQuery";
import { Place } from "../../types/types";
import { useRecoilValue } from "recoil";
import { selectedPlaceAtom } from "../../store/mapAtom";

const SearchResultPage = () => {
  const selectedPlace = useRecoilValue(selectedPlaceAtom);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("query") ?? "";

  const [isMapView, setIsMapView] = useState(selectedPlace ? true : false);

  const navigate = useNavigate();

  const searchResult = useMapSearchQuery(searchQuery);

  return (
    <ExplorePageLayout>
      <SearchBarContainer>
        {!isMapView ? (
          <IconWrapper onClick={() => setIsMapView(true)}>
            <img src="/images/mapIcon.png" alt="map_icon" height={22} />
          </IconWrapper>
        ) : (
          <IconWrapper onClick={() => setIsMapView(false)}>
            <img
              src="/images/search/listIcon.png"
              alt="list_icon"
              height={22}
            />
          </IconWrapper>
        )}

        <SearchBarDisplay value={searchQuery} isMap={false} />
        <IconWrapper onClick={() => navigate("/explore")}>
          <img src="/images/search/xIconBold.png" alt="map_icon" height={22} />
        </IconWrapper>
      </SearchBarContainer>

      <Map places={searchResult.data} />
      {!isMapView && (
        <PlaceList>
          {searchResult.data.map((place: Place) => (
            <PlaceItem key={place.id} place={place} displayAmount={3} />
          ))}
        </PlaceList>
      )}
    </ExplorePageLayout>
  );
};

export default SearchResultPage;

const SearchBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 85px;
  gap: 15px;
  background-color: white;
  z-index: 65;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  height: 30px;
`;

const PlaceList = styled.ul`
  position: absolute;
  inset: 0;
  padding: 90px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  overflow: auto;
`;
