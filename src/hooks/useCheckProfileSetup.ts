import { useNavigate } from "react-router-dom";
import { UserData } from "../types/types";
import { LINK } from "../constants/links";

const useCheckProfileSetup = () => {
  const navigate = useNavigate();

  const checkProfileSetupToNavigate = (user: UserData | null) => {
    if (!user) return navigate(LINK.AUTH_PAGE);

    if (user && (!user?.user_nickname || !user?.user_image_url)) {
      navigate(LINK.PROFILE_SETUP_PAGE);
    }
  };

  return { checkProfileSetupToNavigate };
};

export default useCheckProfileSetup;
