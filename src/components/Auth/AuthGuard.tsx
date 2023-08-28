import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthQuery from "../../hooks/useAuthQuery";
import { ALLOWED_LINK, LINK } from "../../constants/links";

const UserGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const currentUser = useAuthQuery().data;

  useEffect(() => {
    if (currentUser === null) {
      navigate(LINK.AUTH_PAGE);
    }
  }, []);

  if (currentUser === null && ALLOWED_LINK.includes(window.location.pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default UserGuard;
