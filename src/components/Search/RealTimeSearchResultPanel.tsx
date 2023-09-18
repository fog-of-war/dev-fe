import { useRecoilValue } from "recoil";
import { Place } from "../../types/types";
import { SearchList } from "../RecentSearch/RecentSearchesPanel";
import { currentLocationAtom } from "../../store/currentLocationAtom";
import { useEffect, useState } from "react";
import { getPlacesBySearchQuery } from "../../api/place";
import useCurrentLocation from "../../hooks/map/useCurrentLocation";

import RealTimeSearchItem from "./RealTimeSearchItem";
import useDeboucing from "../../hooks/useDeboucing";

const RealtimeSearchResultPanel = ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  // 현재 위치 정보
  const currentLocation = useRecoilValue(currentLocationAtom);
  // 현재 위치 정보 업데이트하는 함수
  const { updateCurrentLocation } = useCurrentLocation();

  // 실시간 검색 결과
  const [realTimeSearchResult, setRealTimeSearchResult] = useState<Place[]>([]);

  // 검색어 디바운싱
  const { debouncedInput } = useDeboucing({ input: searchQuery });

  // 현재 위치 정보가 없으면 현재 위치 정보 업데이트
  useEffect(() => {
    if (!currentLocation) {
      updateCurrentLocation();
    }
  }, [currentLocation]);

  // 검색어가 바뀌면 실시간 검색 결과 업데이트
  useEffect(() => {
    const getSearchResult = async () => {
      if (!currentLocation || !debouncedInput) return;

      const x = currentLocation?.lng!;
      const y = currentLocation?.lat!;

      const searchResult = await getPlacesBySearchQuery(debouncedInput, x, y);
      setRealTimeSearchResult(searchResult);
    };
    getSearchResult();
  }, [debouncedInput, currentLocation]);

  return (
    <SearchList>
      {realTimeSearchResult.map((place: Place) => (
        <RealTimeSearchItem key={place.id} place={place} />
      ))}
    </SearchList>
  );
};

export default RealtimeSearchResultPanel;
