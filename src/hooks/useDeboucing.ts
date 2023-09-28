import { debounce } from "lodash";
import { SetStateAction, useEffect, useState } from "react";

const useDeboucing = (input: string, time = 500) => {
  // 디바운스 된 검색 쿼리 상태
  const [debouncedInput, setDebouncedInput] = useState("");
  // 최신 검색어 업데이트 및 겸색결과 페이지로 이동하는 함수
  // 실시간 인풋 디바운싱하여 서치쿼리로 넘김
  const debounceInput = debounce(
    (value: SetStateAction<string>) => setDebouncedInput(value),
    time
  );

  useEffect(() => {
    debounceInput(input);

    return debounceInput.cancel;
  }, [input, debounceInput]);

  return { debouncedInput };
};

export default useDeboucing;
