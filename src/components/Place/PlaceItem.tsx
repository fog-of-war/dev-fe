/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import B2 from "../UI/B2";
import colors from "../../constants/colors";
import B1 from "../UI/B1";
import { Place } from "../../types/types";
import PlaceImageList from "./PlaceImageList";

interface PlaceItemProps extends React.HTMLAttributes<HTMLLIElement> {
  place: Place;
  displayAmount: 3 | 4;
}

const PlaceItem = ({ place, displayAmount, ...props }: PlaceItemProps) => {
  return (
    <PlaceItemContainer {...props}>
      <TitleContainer>
        <TitleWrapper>
          <h4>{place.name}</h4>
          <B2 css={{ color: colors.lightGrey }}>{place.category}</B2>
        </TitleWrapper>
        <B1
          css={{
            color: colors.lightGrey,
          }}
          onClick={() => {}}
        >
          지도 자세히 보기
        </B1>
      </TitleContainer>
      <RatingWrapper>
        <img src="/images/search/starIcon.png" alt="star" height={21} />
        <B1>
          {place.rating} ({place.reviewCount})
        </B1>
      </RatingWrapper>
      <LocationWrapper>
        <B1>{place.distance < 1 ? place.distance * 1000 : place.distance}m </B1>
        <span css={{ color: colors.paleGrey }}>|</span>
        <B1> {place.address}</B1>
      </LocationWrapper>
      <PlaceImageList images={place.images} displayAmount={displayAmount} />
    </PlaceItemContainer>
  );
};

export default PlaceItem;

const PlaceItemContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #fff;
  padding: 15px;
  gap: 8px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
