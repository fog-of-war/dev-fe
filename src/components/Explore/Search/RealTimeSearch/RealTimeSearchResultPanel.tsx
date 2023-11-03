/** @jsxImportSource @emotion/react */

import { Place } from "../../../../types/types";
import { useEffect, useState, useTransition } from "react";
import { getRequest } from "../../../../api/utils/getRequest";
import { isLastCharKoreanConsonantOrVowel } from "../../../../utils/checkLastChar";
import useCurrentLocation from "../../../../hooks/map/useCurrentLocation";
import { SearchList } from "../styles/Search.styles";

import RealTimeSearchItem from "./RealTimeSearchItem";
import NoSearchData from "../NoSearchData";
import SearchPannelHeader from "../SearchPannelHeader";

interface RealtimeSearchResultPanelProps {
  searchQuery: string;
}

const RealtimeSearchResultPanel = ({
  searchQuery,
}: RealtimeSearchResultPanelProps) => {
  const [realTimeSearchResult, setRealTimeSearchResult] = useState<Place[]>([]);
  const [isPending, startTransition] = useTransition();
  const { currentLocation } = useCurrentLocation();

  useEffect(() => {
    startTransition(() => {
      const fetchRealTimeSearchResult = async () => {
        if (!currentLocation || !searchQuery) return;
        if (isLastCharKoreanConsonantOrVowel(searchQuery)) return;

        const x = currentLocation?.lng!;
        const y = currentLocation?.lat!;

        const searchResult = await getRequest({
          url: `v1/places/search?query=${searchQuery}&x=${x}&y=${y}`,
        });
        setRealTimeSearchResult(searchResult);
      };
      fetchRealTimeSearchResult();
    });
  }, [searchQuery, currentLocation, startTransition]);

  return (
    <>
      <SearchPannelHeader title="검색 결과" />
      <SearchList>
        {realTimeSearchResult.map((place: Place) => (
          <RealTimeSearchItem key={place.id} place={place} />
        ))}
        {realTimeSearchResult.length === 0 && !isPending && <NoSearchData />}
      </SearchList>
    </>
  );
};

export default RealtimeSearchResultPanel;
