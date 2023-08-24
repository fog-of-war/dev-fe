/** @jsxImportSource @emotion/react */

import { SetStateAction, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchState } from "../store/searchAtom";
import { Place, Search } from "../types/types";
import { useNavigate } from "react-router-dom";
import { getPlacesBySearchQuery } from "../api/post";
import { currentLocationAtom } from "../store/currentLocationAtom";
import { selectedPlaceAtom } from "../store/mapAtom";

const useSearchMap = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Place[]>([]);
  const currentLocation = useRecoilValue(currentLocationAtom);
  const setRecentSearches = useSetRecoilState(searchState);
  const setSelectedPlace = useSetRecoilState(selectedPlaceAtom);
  const navigate = useNavigate();

  // 실시간 인풋 디바운싱하여 서치쿼리로 넘기는 함수
  const debounceInput = debounce(
    (value: SetStateAction<string>) => setSearchQuery(value),
    500
  );

  useEffect(() => {
    debounceInput(inputValue);

    // 디바운스 취소 클린업 함수
    return debounceInput.cancel;
  }, [inputValue, debounceInput]);

  // 리액트 쿼리

  useEffect(() => {
    const getSearchResult = async () => {
      const x = currentLocation?.lng!;
      const y = currentLocation?.lat!;
      if (searchQuery) {
        const searchResult = await getPlacesBySearchQuery(searchQuery, x, y);
        setSearchResult(searchResult);
      }
    };
    getSearchResult();
  }, [searchQuery]);

  const updateRecentSearches = (newRecentSearch: Search) => {
    setRecentSearches((prevSearches: Search[]) => {
      // 최신 검색어를 배열 맨 앞에 추가하고 최대 개수를 유지합니다.
      const updatedSearches = [
        newRecentSearch,
        ...prevSearches.filter(
          (search: Search) => search.search !== newRecentSearch.search
        ),
      ];
      return updatedSearches.slice(0, 10);
    });
  };

  const handleSearchMap = (
    e: React.KeyboardEvent<HTMLInputElement> & { isComposing: boolean }
  ) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      console.log("검색어:", inputValue);
      const newRecentSearch = {
        id: Date.now(),
        search: inputValue,
        type: "keword",
      };
      updateRecentSearches(newRecentSearch);
      setSelectedPlace(null);
      navigate(`/search/result?query=${inputValue}`);
      // 검색 로직
    }
  };

  return { searchResult, inputValue, handleSearchMap, setInputValue };
};

export default useSearchMap;
