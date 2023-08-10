/** @jsxImportSource @emotion/react */

import { useLocation, useNavigate } from "react-router-dom";
import { ExplorePageLayout } from "../../styles/styles";
import styled from "@emotion/styled";
import { useState } from "react";
import SearchBarDisplay from "../../components/Search/SearchBarDisplay";
import SearchResultItem from "../../components/Search/SearchResultItem";

const DUMMY_DATA = [
  {
    id: "1",
    name: "포장마차",
    address: "서울특별시 강남구 논현동 123-1",
    category: "한식",
    rating: 4.5,
    reviewCount: 123,
    distance: 0.5,
    images: [
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
    ],
  },
  {
    id: "2",
    name: "포장마차",
    address: "서울특별시 강남구 논현동 123-1",
    category: "한식",
    rating: 4.5,
    reviewCount: 123,
    distance: 0.5,
    images: [
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
    ],
  },
  {
    id: "3",
    name: "포장마차",
    address: "서울특별시 강남구 논현동 123-1",
    category: "한식",
    rating: 4.5,
    reviewCount: 123,
    distance: 0.5,
    images: [
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
    ],
  },
];

const SearchResultPage = () => {
  const [isMapView, setIsMapView] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("query") ?? "";
  const navigate = useNavigate();

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

        <SearchBarDisplay value={searchQuery} />
        <IconWrapper onClick={() => navigate("/explore")}>
          <img src="/images/search/xIconBold.png" alt="map_icon" height={22} />
        </IconWrapper>
      </SearchBarContainer>
      {isMapView ? (
        <div
          css={{
            width: "calc(100% + 40px)",
            marginLeft: "-20px",
            height: "100%",
            backgroundImage: "url(/garbage/map.png)",
            backgroundSize: "cover",
          }}
        />
      ) : (
        <SearchResultList>
          {DUMMY_DATA.map((data) => (
            <SearchResultItem searchResult={data} />
          ))}
        </SearchResultList>
      )}
    </ExplorePageLayout>
  );
};

export default SearchResultPage;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
  background-color: white;
  padding-bottom: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  height: 30px;
`;

const SearchResultList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
