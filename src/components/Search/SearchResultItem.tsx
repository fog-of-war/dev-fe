/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import B2 from "../UI/B2";
import colors from "../../constants/colors";
import B1 from "../UI/B1";

interface SearchResultItemProps {
  searchResult: {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviewCount: number;
    distance: number;
    address: string;
    images: string[];
  };
}

const SearchResultItem = ({ searchResult }: SearchResultItemProps) => {
  return (
    <SearchResultItemContainer>
      <B1
        css={{
          position: "absolute",
          top: 16,
          right: 15,
          color: colors.lightGrey,
        }}
        onClick={() => {}}
      >
        지도 자세히 보기
      </B1>
      <TitleWrapper>
        <h4>{searchResult.name}</h4>
        <B2 css={{ color: colors.lightGrey }}>{searchResult.category}</B2>
      </TitleWrapper>
      <RatingWrapper>
        <img src="/images/search/starIcon.png" alt="star" height={21} />
        <B1>
          {searchResult.rating} ({searchResult.reviewCount})
        </B1>
      </RatingWrapper>
      <LocationWrapper>
        <B1>
          {searchResult.distance < 1
            ? searchResult.distance * 1000
            : searchResult.distance}
          m{" "}
        </B1>
        <span css={{ color: colors.paleGrey }}>|</span>
        <B1> {searchResult.address}</B1>
      </LocationWrapper>
      <ImageContainer>
        {searchResult.images.map((image) => (
          <ImageWrapper>
            <img
              src={image}
              alt="review_image"
              css={{ width: "100%", objectFit: "cover" }}
            />
          </ImageWrapper>
        ))}
      </ImageContainer>
    </SearchResultItemContainer>
  );
};

export default SearchResultItem;

const SearchResultItemContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #fff;
  padding: 15px;
  gap: 8px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 3px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  flex-grow: 1;
  aspect-ratio: 4/3;
  border-radius: 10px;
  background: #f3f3f3;
  overflow: hidden;
`;
