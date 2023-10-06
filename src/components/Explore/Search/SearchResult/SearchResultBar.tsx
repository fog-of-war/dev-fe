import styled from "@emotion/styled";
import { useContext } from "react";
import { MapContext } from "../../../../context/MapContext";
import { useNavigate } from "react-router-dom";

import SearchBarDisplay from "./SearchBarDisplay";
import { LINK } from "../../../../constants/links";

const SearchResultBar = ({ searchQuery }: { searchQuery: string }) => {
  const navigate = useNavigate();
  const { isMapView, setIsMapView } = useContext(MapContext);

  return (
    <SearchBarContainer>
      {!isMapView ? (
        <IconWrapper onClick={() => setIsMapView(true)}>
          <img src="/images/mapIcon.png" alt="map_icon" height={22} />
        </IconWrapper>
      ) : (
        <IconWrapper onClick={() => setIsMapView(false)}>
          <img src="/images/search/listIcon.png" alt="list_icon" height={22} />
        </IconWrapper>
      )}

      <SearchBarDisplay value={searchQuery} isMap={false} />
      <IconWrapper onClick={() => navigate(LINK.EXPLORE_PAGE)}>
        <img src="/images/search/xIconBold.png" alt="map_icon" height={22} />
      </IconWrapper>
    </SearchBarContainer>
  );
};

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

export default SearchResultBar;
