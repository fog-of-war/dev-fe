import { useRecoilState } from "recoil";
import { recentSearchHistoryState } from "../../store/recentSearchHistoryAtom";
import { Search } from "../../types/types";

export interface RecentSearchProps {
  searchQuery: string;
  type: "keyword" | "place";
}

const useRecentSearch = () => {
  // 최근 검색어를 퍼시스트를 통해 로컬스토리지에서 관리하는 상태
  const [recentSearchHistory, setRecentSearchHistory] = useRecoilState<
    Search[]
  >(recentSearchHistoryState);

  /** 서치쿼리, 타입을 인자로 받아 최근 검색어를 업데이트하는 함수 */
  const updateRecentSearcheHistory = ({
    searchQuery,
    type,
  }: RecentSearchProps) => {
    const newRecentSearch: Search = {
      id: Date.now(),
      searchQuery,
      type,
    };

    setRecentSearchHistory((prevRecentSearchHistory: Search[]) => {
      // 최신 검색어를 배열 맨 앞에 추가하고 최대 개수를 유지
      const updatedSearchHistory = [
        newRecentSearch,
        ...prevRecentSearchHistory.filter(
          (search: Search) => search.searchQuery !== newRecentSearch.searchQuery
        ),
      ];
      return updatedSearchHistory.slice(0, 10);
    });
  };

  /** 최근 검색어 하나를 삭제하는 함수 */
  const deleteRecentSearchHistory = (removeTargetSearch: Search) => {
    setRecentSearchHistory((prevSearches: Search[]) =>
      prevSearches.filter((search) => search.id !== removeTargetSearch.id)
    );
  };

  /** 선택된 최근 검색어들을 삭제하는 함수 */
  const deleteSelectedRecentSearchHistory = (selectedSearches: Search[]) => {
    setRecentSearchHistory((prevSearches: Search[]) =>
      prevSearches.filter((search) => !selectedSearches.includes(search))
    );
  };

  return {
    recentSearchHistory,
    updateRecentSearcheHistory,
    deleteRecentSearchHistory,
    deleteSelectedRecentSearchHistory,
  };
};

export default useRecentSearch;
