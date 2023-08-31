import { useNavigate } from "react-router-dom";
import useRecentSearch, { RecentSearchProps } from "./useRecentSearch";
import { LINK } from "../../constants/links";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

const useSearch = () => {
  const navigate = useNavigate();
  const { updateRecentSearcheHistory } = useRecentSearch();
  const { setIsMapView } = useContext(MapContext);

  /** 최근 검색어를 업데이트하고 검색결과 페이지로 이동시켜주는 함수 */
  const handleSearchAndRecent = ({
    searchQuery,
    type,
    place,
  }: RecentSearchProps) => {
    updateRecentSearcheHistory({ searchQuery, type, place });
    setIsMapView(false);
    navigate(`${LINK.SEARCH_RESULT_PAGE}?query=${searchQuery}`);
  };

  return { handleSearchAndRecent };
};

export default useSearch;
