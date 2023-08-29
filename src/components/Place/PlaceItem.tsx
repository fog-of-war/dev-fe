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
import NavigateModal from "../Map/NavigateModal";

const DUMMY_IMAGE: string[] = [];

interface PlaceItemProps extends React.HTMLAttributes<HTMLLIElement> {
  place: Place;
  displayAmount: 3 | 4;
}

const PlaceItem = ({ place, displayAmount, ...props }: PlaceItemProps) => {
  const navigateModal = useNavigateModal();
  const { handleMoveSelectedPlace } = useContext(MapContext);

  return (
    <PlaceItemContainer {...props}>
      <NavigateModal
        isOpen={navigateModal.isOpen}
        onClose={navigateModal.onClose}
        url={place.place_url}
      />
      <TitleContainer
        onClick={() => {
          handleMoveSelectedPlace(place);
        }}
      >
        <TitleWrapper>
          <h4>{place.place_name}</h4>
          <B2 css={{ color: colors.lightGrey }}>{place.category_group_name}</B2>
        </TitleWrapper>
        <B1
          css={{
            color: colors.lightGrey,
            cursor: "pointer",
          }}
          onClick={navigateModal.onOpen}
        >
          지도 자세히 보기
        </B1>
      </TitleContainer>
      <RatingWrapper>
        <img src="/images/search/starIcon.png" alt="star" height={21} />
        <B1>4.5 (499)</B1>
      </RatingWrapper>
      <LocationWrapper>
        <B1>{(+place.distance / 1000).toFixed(1)}km </B1>
        <span css={{ color: colors.paleGrey }}>|</span>
        <B1> {place.road_address_name}</B1>
      </LocationWrapper>
      <PlaceImageList images={DUMMY_IMAGE} displayAmount={displayAmount} />
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
