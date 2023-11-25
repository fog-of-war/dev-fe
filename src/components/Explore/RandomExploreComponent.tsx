import React, { useEffect, useState } from "react";
import { SearchPageLayout as ExplorePageLayout } from "./Search/styles/Search.styles";
import SearchBarDisplay from "./Search/SearchResult/SearchBarDisplay";
import TagButtonList from "./Search/SearchTag/TagButtonList";
import Map from "./Map/GoogleMap";
import { currentLocationAtom } from "../../store/currentLocationAtom";
import { useRecoilValue } from "recoil";
import useCurrentPlace from "./Search/hooks/useCurrentPlace";

const RandomExplorePageComponent = () => {
  const currentLocation = useRecoilValue(currentLocationAtom);
  const [coordinates, setCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (currentLocation) {
      setCoordinates({
        x: currentLocation.lng || 0,
        y: currentLocation.lat || 0,
      });
    }
  }, [currentLocation]);

  const { searchResult } = useCurrentPlace({ coordinates });

  return (
    <ExplorePageLayout>
      <SearchBarDisplay placeholder="어디로 떠나보실래요?" isMap={true} />
      <TagButtonList />
      <Map places={searchResult} />
    </ExplorePageLayout>
  );
};

export default RandomExplorePageComponent;
