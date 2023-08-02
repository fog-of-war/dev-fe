/** @jsxImportSource @emotion/react */

import { KeyboardEvent, SetStateAction, useEffect, useState } from "react";
import { debounce } from "lodash";

const useSearchMap = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  console.log("검색 :" + inputValue);
  console.log("디바운스 검색:" + searchQuery);

  const handleSearchMap = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("검색어:", inputValue);
      // 검색 로직
    }
  };

  return { inputValue, handleSearchMap, setInputValue };
};

export default useSearchMap;
