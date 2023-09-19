import { useQuery, useQueryClient } from "react-query";
import { getCurrentUser } from "../api/auth";
import { UserData } from "../types/types";
import { QUERY_KEY } from "../react-query/queryKey";

export const useAuthQuery = () => {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEY.CURRENT_USER];
  const queryFn = getCurrentUser;
  const fallback = null;

  const { data = fallback } = useQuery<UserData>(queryKey, queryFn, {
    retry: false,
  });

  const invalidateUser = () => {
    queryClient.invalidateQueries(QUERY_KEY.CURRENT_USER);
  };

  return { data, invalidateUser };
};

export default useAuthQuery;
