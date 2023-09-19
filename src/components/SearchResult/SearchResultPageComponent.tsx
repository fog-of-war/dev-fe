/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { ExplorePageLayout } from "../../styles/styles";
import styled from "@emotion/styled";
import { useContext } from "react";
import { Place } from "../../types/types";
import { MapContext } from "../../context/MapContext";
import useMapSearchQuery from "../../hooks/useMapSearchQuery";
import { LINK } from "../../constants/links";

import SearchBarDisplay from "../Search/SearchBarDisplay";
import PlaceItem from "../Place/PlaceItem";
import Map from "../Map/GoogleMap";

interface SearchResultPageComonentProps {
  searchQuery: string;
}

/** 검색결과 페이지 컴포넌트 */
const SearchResultPageComponent = ({
  searchQuery,
}: SearchResultPageComonentProps) => {
  const navigate = useNavigate();

  // 맵뷰인지 리스트뷰인인지 관리하는 상태 컨텍스트
  const { isMapView, setIsMapView } = useContext(MapContext);

  // 검색 결과 데이터 관리하는 리액트 쿼리 커스텀훅
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
        <IconWrapper onClick={() => navigate(LINK.EXPLORE_PAGE)}>
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

export default SearchResultPageComponent;

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
