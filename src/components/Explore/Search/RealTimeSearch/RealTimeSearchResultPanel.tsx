/** @jsxImportSource @emotion/react */

import { Place } from "../../../../types/types";
import { SearchList } from "../RecentSearch/RecentSearchesPanel";
import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { getRequest } from "../../../../api/utils/getRequest";
import { isLastCharKoreanConsonantOrVowel } from "../../../../utils/checkLastChar";
import useCurrentLocation from "../../../../hooks/map/useCurrentLocation";

import RealTimeSearchItem from "./RealTimeSearchItem";
import NoSearchData from "../NoSearchData";

interface RealtimeSearchResultPanelProps {
  searchQuery: string;
}

const RealtimeSearchResultPanel = ({
  searchQuery,
}: RealtimeSearchResultPanelProps) => {
  const [isPending, startTransition] = useTransition();
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const { currentLocation } = useCurrentLocation();

  const [realTimeSearchResult, setRealTimeSearchResult] = useState<Place[]>([]);

  useEffect(() => {
    startTransition(() => {
      const getSearchResult = async () => {
        if (!currentLocation || !deferredSearchQuery) return;
        if (isLastCharKoreanConsonantOrVowel(deferredSearchQuery)) return;

        const x = currentLocation?.lng!;
        const y = currentLocation?.lat!;

        const searchResult = await getRequest({
          url: `v1/places/search?query=${deferredSearchQuery}&x=${x}&y=${y}`,
        });
        setRealTimeSearchResult(searchResult);
      };
      getSearchResult();
    });
  }, [deferredSearchQuery, currentLocation, startTransition]);

  return (
    <SearchList>
      {realTimeSearchResult.map((place: Place) => (
        <RealTimeSearchItem key={place.id} place={place} />
      ))}
      {realTimeSearchResult.length === 0 && !isPending && <NoSearchData />}
    </SearchList>
  );
};

export default RealtimeSearchResultPanel;
