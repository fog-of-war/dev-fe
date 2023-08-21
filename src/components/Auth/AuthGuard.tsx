import { ReactNode, useEffect } from "react";
import { getCurrentUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const UserGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      console.log(currentUser);
      if (!currentUser) {
        navigate("/auth");
      }
    };
    checkUser();
  }, []);

  return <>{children}</>;
};

export default UserGuard;
