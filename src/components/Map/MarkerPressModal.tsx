/** @jsxImportSource @emotion/react */

import BottomModal from "../BottomModal";
import PlaceItem from "../Place/PlaceItem";

const DUMMY_DATA = {
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
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
  ],
};

const MarkerPressModal = () => {
  return (
    <BottomModal>
      <PlaceItem
        place={DUMMY_DATA}
        displayAmount={4}
        css={{
          padding: 0,
          border: "none",
          boxShadow: "none",
        }}
      />
    </BottomModal>
  );
};

export default MarkerPressModal;
