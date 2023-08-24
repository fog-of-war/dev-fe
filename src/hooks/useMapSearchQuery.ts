import { useQuery } from "react-query";
import { getPlacesBySearchQuery } from "../api/post";
import { useRecoilValue } from "recoil";
import { Place } from "../types/types";
import { currentLocationAtom } from "../store/currentLocationAtom";

const useMapSearchQuery = (query: string) => {
  const currentLocation = useRecoilValue(currentLocationAtom);

  const x = currentLocation?.lng!;
  const y = currentLocation?.lat!;

  const fallback = [] as Place[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Place[]>(["search"], () => getPlacesBySearchQuery(query, x, y));

  return { data, isLoading, isError };
};

export default useMapSearchQuery;
