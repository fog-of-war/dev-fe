/** @jsxImportSource @emotion/react */

import { Place } from "../../../../types/types";
import { SearchList } from "../RecentSearch/RecentSearchesPanel";
import { useEffect, useState } from "react";
import { getRequest } from "../../../../api/utils/getRequest";
import { isLastCharKoreanConsonantOrVowel } from "../../../../utils/checkLastChar";
import useCurrentLocation from "../../../../hooks/map/useCurrentLocation";

import RealTimeSearchItem from "./RealTimeSearchItem";
import useDeboucing from "../../../../hooks/useDeboucing";
import NoSearchData from "../NoSearchData";

interface RealtimeSearchResultPanelProps {
  searchQuery: string;
}

const RealtimeSearchResultPanel = ({
  searchQuery,
}: RealtimeSearchResultPanelProps) => {
  // 현재 위치
  const { currentLocation } = useCurrentLocation();

  // 실시간 검색 결과
  const [realTimeSearchResult, setRealTimeSearchResult] = useState<Place[]>([]);

  // 검색어 디바운싱
  const { debouncedInput } = useDeboucing(searchQuery, 500);

  // 검색어가 바뀌면 실시간 검색 결과 업데이트
  useEffect(() => {
    const getSearchResult = async () => {
      if (!currentLocation || !debouncedInput) return;
      if (isLastCharKoreanConsonantOrVowel(debouncedInput)) return;

      console.log(isLastCharKoreanConsonantOrVowel(debouncedInput));

      const x = currentLocation?.lng!;
      const y = currentLocation?.lat!;

      const searchResult = await getRequest({
        url: `v1/places/search?query=${debouncedInput}&x=${x}&y=${y}`,
      });
      setRealTimeSearchResult(searchResult);
    };
    getSearchResult();
  }, [debouncedInput, currentLocation]);

  return (
    <SearchList>
      {realTimeSearchResult.map((place: Place) => (
        <RealTimeSearchItem key={place.id} place={place} />
      ))}
      {realTimeSearchResult.length === 0 && <NoSearchData />}
    </SearchList>
  );
};

export default RealtimeSearchResultPanel;
