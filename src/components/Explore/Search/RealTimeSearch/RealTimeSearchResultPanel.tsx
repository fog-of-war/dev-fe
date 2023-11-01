/** @jsxImportSource @emotion/react */

import { Place } from "../../../../types/types";
import { SearchList } from "../RecentSearch/RecentSearchesPanel";
import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { getRequest } from "../../../../api/utils/getRequest";
import { isLastCharKoreanConsonantOrVowel } from "../../../../utils/checkLastChar";
import useCurrentLocation from "../../../../hooks/map/useCurrentLocation";
import useDeboucing from "../../../../hooks/useDeboucing";

import RealTimeSearchItem from "./RealTimeSearchItem";
import NoSearchData from "../NoSearchData";

interface RealtimeSearchResultPanelProps {
  searchQuery: string;
}

const RealtimeSearchResultPanel = ({
  searchQuery,
}: RealtimeSearchResultPanelProps) => {
  const [realTimeSearchResult, setRealTimeSearchResult] = useState<Place[]>([]);

  const [isPending, startTransition] = useTransition();

  const { currentLocation } = useCurrentLocation();

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const { debouncedInput: debouncedSearchQuery } = useDeboucing(
    deferredSearchQuery,
    300
  );

  useEffect(() => {
    startTransition(() => {
      const getSearchResult = async () => {
        if (!currentLocation || !debouncedSearchQuery) return;
        if (isLastCharKoreanConsonantOrVowel(debouncedSearchQuery)) return;

        const x = currentLocation?.lng!;
        const y = currentLocation?.lat!;

        const searchResult = await getRequest({
          url: `v1/places/search?query=${debouncedSearchQuery}&x=${x}&y=${y}`,
        });
        setRealTimeSearchResult(searchResult);
      };
      getSearchResult();
    });
  }, [debouncedSearchQuery, currentLocation, startTransition]);

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
