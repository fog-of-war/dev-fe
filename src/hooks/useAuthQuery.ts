import { useQuery } from "react-query";
import { getCurrentUser } from "../api/auth";
import { UserData } from "../types/types";
import { QUERY_KEY } from "../react-query/queryKey";

export const useAuthQuery = () => {
  const queryKey = [QUERY_KEY.CURRENT_USER];
  const queryFn = getCurrentUser;
  const fallback = null;

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<UserData>(queryKey, queryFn, { retry: false });

  return { data, isLoading, isError };
};

export default useAuthQuery;
