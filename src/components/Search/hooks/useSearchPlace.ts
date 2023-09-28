import { useQuery } from "react-query";
import { Place } from "../../../types/types";
import { getRequest } from "../../../api/utils/getRequest";
import { QUERY_KEY } from "../../../react-query/queryKey";
import useCurrentLocation from "../../../hooks/map/useCurrentLocation";

const useSearchPlace = (query: string) => {
  const { currentLocation } = useCurrentLocation();

  const x = currentLocation?.lng!;
  const y = currentLocation?.lat!;

  const { data: searchResult } = useQuery<Place[]>([QUERY_KEY.SEARCHES], () =>
    getRequest({ url: `v1/places/search?query=${query}&x=${x}&y=${y}` })
  );

  return { searchResult };
};

export default useSearchPlace;
