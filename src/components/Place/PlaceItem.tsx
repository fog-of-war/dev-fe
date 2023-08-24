/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import B2 from "../UI/B2";
import colors from "../../constants/colors";
import B1 from "../UI/B1";
import { Place } from "../../types/types";
import PlaceImageList from "./PlaceImageList";
import { useNavigateModal } from "../../hooks/useNavigateModal";
import NavigateModal from "../Map/NavigateModal";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { mapViewAtomState, selectedPlaceAtom } from "../../store/mapAtom";

const DUMMY_IMAGE = [
  "https://source.unsplash.com/random",
  "https://source.unsplash.com/random",
  "https://source.unsplash.com/random",
  "https://source.unsplash.com/random",
  "https://source.unsplash.com/random",
];

interface PlaceItemProps extends React.HTMLAttributes<HTMLLIElement> {
  place: Place;
  displayAmount: 3 | 4;
}

const PlaceItem = ({ place, displayAmount, ...props }: PlaceItemProps) => {
  const navigateModal = useNavigateModal();
  const navigate = useNavigate();
  const setSelectedPlace = useSetRecoilState(selectedPlaceAtom);
  const setMapCenter = useSetRecoilState(mapViewAtomState);

  return (
    <PlaceItemContainer {...props}>
      <NavigateModal
        isOpen={navigateModal.isOpen}
        onClose={navigateModal.onClose}
        url={place.place_url}
      />
      <TitleContainer
        onClick={() => {
          setMapCenter({
            center: {
              lat: +place.y,
              lng: +place.x,
            },
            zoom: 18,
          });
          setSelectedPlace(place.place_name);
          navigate(`/search/result?query=${place.place_name}`);
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
