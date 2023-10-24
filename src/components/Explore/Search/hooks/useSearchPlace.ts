import { useQuery } from "react-query";
import { Place } from "../../../../types/types";
import { getRequest } from "../../../../api/utils/getRequest";
import { QUERY_KEY } from "../../../../react-query/queryKey";

interface SearchPlaceParams {
  query: string;
  coordinates: {
    x: number;
    y: number;
  } | null;
}

const useSearchPlace = ({ query, coordinates }: SearchPlaceParams) => {
  const { data: searchResult } = useQuery<Place[]>(
    [QUERY_KEY.SEARCHES],
    () =>
      getRequest({
        url: `v1/places/search?query=${query}&x=${coordinates?.x}&y=${coordinates?.y}`,
      }),
    {
      enabled: !!coordinates,
    }
  );

  return { searchResult };
};

export default useSearchPlace;
