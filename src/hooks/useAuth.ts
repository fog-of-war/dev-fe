import { useQuery, useQueryClient } from "react-query";
import { getCurrentUser } from "../api/auth";
import { UserData } from "../types/types";
import { QUERY_KEY } from "../react-query/queryKey";
import {
  getCurrentUserFromStorage,
  removeCurrentUserFromStorage,
  setCurrentUserToStorage,
} from "../utils/currentUserStore";

interface UseAuth {
  data: UserData | null;
  updateCurrentUser: (newData: UserData) => void;
  clearCurrentUser: () => void;
  invalidateCurrentUser: () => void;
}

export const useAuth = (): UseAuth => {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEY.CURRENT_USER];

  const { data } = useQuery(queryKey, getCurrentUser, {
    initialData: getCurrentUserFromStorage,
    onSuccess: (receivedData) => {
      if (!receivedData) {
        removeCurrentUserFromStorage();
      } else {
        setCurrentUserToStorage(receivedData);
      }
    },
    retry: 0,
  });

  const updateCurrentUser = (newData: UserData) => {
    queryClient.setQueryData(queryKey, newData);
  };

  const clearCurrentUser = () => {
    queryClient.setQueryData(queryKey, null);
  };

  const invalidateCurrentUser = () => {
    queryClient.invalidateQueries(queryKey);
  };

  return { data, updateCurrentUser, clearCurrentUser, invalidateCurrentUser };
};

export default useAuth;
