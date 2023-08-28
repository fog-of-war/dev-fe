import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthQuery from "../../hooks/useAuthQuery";
import { ALLOWED_LINK, LINK } from "../../constants/links";

const UserGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const currentUser = useAuthQuery();

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
    return <div>에러삐비빕</div>;
  }

  return <>{children}</>;
};

export default UserGuard;
