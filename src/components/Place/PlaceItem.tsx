/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import colors from "../../constants/colors";
import { useNavigateModal } from "../../hooks/useNavigateModal";
import { Place } from "../../types/types";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import { formatDistance } from "../../utils/formatDistance";

import B2 from "../UI/B2";
import B1 from "../UI/B1";
import PlaceImages from "../Certification/PlaceImages";

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
      <PlaceInfoWrapper onClick={() => handleMapMoveSelectedPlace(place)}>
        <TitleContainer>
          <TitleWrapper>
            <h4>{place_name}</h4>
            <B2 css={{ color: colors.lightGrey }}>{category_group_name}</B2>
          </TitleWrapper>
          <B2
            css={{
              color: colors.lightGrey,
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "underline",
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
          </B2>
        </TitleContainer>
        <RatingWrapper>
          <img src="/images/search/starIcon.png" alt="star" height={18} />
          <B1>
            {place_star_rating || 0} ({place_posts?.length || 0})
          </B1>
        </RatingWrapper>
        <LocationWrapper>
          <B1>{formatDistance(distance)}</B1>
          <span css={{ color: colors.paleGrey }}>|</span>
          <B1> {road_address_name}</B1>
        </LocationWrapper>
      </PlaceInfoWrapper>
      <PlaceImages
        images={place_posts.map((post) => post.post_image_url)}
        placeId={place_posts.map((post) => post.post_place_id)}
        onClick={() => {}}
      />
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
  gap: 5px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
`;

const PlaceInfoWrapper = styled.div`
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
  line-height: 1.2;
  gap: 3px;

  h4 {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
