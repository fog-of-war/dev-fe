/** @jsxImportSource @emotion/react */

import { SetStateAction, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useRecoilValue } from "recoil";
import { Place } from "../../types/types";
import { getPlacesBySearchQuery } from "../../api/post";
import { currentLocationAtom } from "../../store/currentLocationAtom";
import { toast } from "react-hot-toast";
import useSearch from "./useSearch";

const useSearchMap = () => {
  // 실시간 검색 인풋 상태
  const [inputValue, setInputValue] = useState("");
  // 디바운스 된 검색 쿼리 상태
  const [searchQuery, setSearchQuery] = useState("");
  // 실시간 검색 결과 상태
  const [realtimeSearchResult, setRealTimeSearchResult] = useState<Place[]>([]);
  // 현재 위치 상태
  const currentLocation = useRecoilValue(currentLocationAtom);
  // 최신 검색어 업데이트 및 겸색결과 페이지로 이동하는 함수
  const { handleSearchAndRecent } = useSearch();

  // 실시간 인풋 디바운싱하여 서치쿼리로 넘김
  const debounceInput = debounce(
    (value: SetStateAction<string>) => setSearchQuery(value),
    500
  );

  useEffect(() => {
    debounceInput(inputValue);

    return debounceInput.cancel;
  }, [inputValue, debounceInput]);

  // 실시간 검색 결과를 받아 상태를 업데이트
  useEffect(() => {
    const getSearchResult = async () => {
      const x = currentLocation?.lng!;
      const y = currentLocation?.lat!;
      if (searchQuery) {
        const searchResult = await getPlacesBySearchQuery(searchQuery, x, y);
        setRealTimeSearchResult(searchResult);
      }
    };
    getSearchResult();
  }, [searchQuery]);

  /** 키보드 이벤트로 검색하는 함수 */
  const handleSearchByKeyboard = (
    e: React.KeyboardEvent<HTMLInputElement> & { isComposing: boolean }
  ) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      if (inputValue.trim().length === 0) {
        toast.error("검색어를 입력해주세요.");
        return;
      }
      handleSearchAndRecent({ searchQuery: inputValue, type: "keyword" });
    }
  };

  return {
    realtimeSearchResult,
    inputValue,
    handleSearchByKeyboard,
    setInputValue,
  };
};

export default useSearchMap;
