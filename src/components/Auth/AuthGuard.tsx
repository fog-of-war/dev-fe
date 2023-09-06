import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthQuery from "../../hooks/useAuthQuery";
import { ALLOWED_LINK, LINK } from "../../constants/links";
import { STORAGE_KEY } from "../../constants/storage";

const UserGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const currentUser = useAuthQuery();

  const pathname = window.location.pathname;

  useEffect(() => {
    if (
      pathname !== LINK.PROFILE_SETUP_PAGE &&
      currentUser.data &&
      (!currentUser.data?.user_nickname || !currentUser.data?.user_image_url)
    ) {
      navigate(LINK.PROFILE_SETUP_PAGE);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.data === null && !currentUser.isLoading) {
      navigate(LINK.AUTH_PAGE);
    }
  }, [currentUser.data, currentUser.isLoading]);

  if (
    currentUser.data === null &&
    !ALLOWED_LINK.includes(window.location.pathname)
  ) {
    return null;
  }

  if (currentUser.isError) {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    return <div>에러삐비빕</div>;
  }

  return <>{children}</>;
};

export default UserGuard;
