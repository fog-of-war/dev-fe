/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import colors from "../../constants/colors";
import { useNavigateModal } from "../../hooks/useNavigateModal";
import { Place } from "../../types/types";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

import B2 from "../UI/B2";
import B1 from "../UI/B1";
import PlaceImageList from "./PlaceImageList";

interface PlaceItemProps extends React.HTMLAttributes<HTMLLIElement> {
  place: Place;
  displayAmount: 3 | 4;
}

const PlaceItem = ({ place, displayAmount, ...props }: PlaceItemProps) => {
  const {
    place_name,
    place_url,
    category_group_name,
    place_posts,
    place_star_rating,
    distance,
    road_address_name,
    naver_place_url,
  } = place;

  const navigateModal = useNavigateModal();

  const { handleMapMoveSelectedPlace } = useContext(MapContext);

  return (
    <PlaceItemContainer {...props}>
      <TitleContainer onClick={() => handleMapMoveSelectedPlace(place)}>
        <TitleWrapper>
          <h4>{place_name}</h4>
          <B2 css={{ color: colors.lightGrey }}>{category_group_name}</B2>
        </TitleWrapper>
        <B1
          css={{
            color: colors.lightGrey,
            cursor: "pointer",
          }}
          onClick={(event) => {
            event.stopPropagation();
            navigateModal.onOpen({
              kakaoUrl: place_url,
              naverUrl: naver_place_url,
            });
          }}
        >
          지도 자세히 보기
        </B1>
      </TitleContainer>
      <RatingWrapper>
        <img src="/images/search/starIcon.png" alt="star" height={21} />
        {place_posts.length !== 0 ? (
          <B1>
            {place_star_rating || 0} ({place_posts?.length || 0})
          </B1>
        ) : (
          <B1 css={{ color: colors.primary }}>
            이 장소의 첫번째 탐험자가 되어 보세요!
          </B1>
        )}
      </RatingWrapper>
      <LocationWrapper>
        <B1>{(+distance / 1000).toFixed(1)}km </B1>
        <span css={{ color: colors.paleGrey }}>|</span>
        <B1> {road_address_name}</B1>
      </LocationWrapper>
      <PlaceImageList posts={place_posts || []} displayAmount={displayAmount} />
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
  cursor: pointer;
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
