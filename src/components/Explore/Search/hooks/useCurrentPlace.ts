import { useQuery } from "react-query";
import { Place } from "../../../../types/types";
import { getRandomPlaces } from "../../../../api/place";

interface currentPlaceParams {
  coordinates: {
    x: number;
    y: number;
  } | null;
}

const useCurrentPlace = ({ coordinates }: currentPlaceParams) => {
  const {
    data: searchResult,
    isLoading,
    isError,
  } = useQuery<Place[]>(
    ["currentPlace"],
    async () => {
      if (coordinates) {
        return getRandomPlaces(coordinates.x, coordinates.y);
      }
      return [];
    },
    {
      enabled: !!coordinates,
    }
  );

  return { searchResult, isLoading, isError };
};

export default useCurrentPlace;
