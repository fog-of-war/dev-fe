import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthQuery from "../../hooks/useAuthQuery";
import { ALLOWED_LINK, LINK } from "../../constants/links";
import { removeTokenInStore } from "../../api/auth";

/**  */
const AuthCheck = ({ children }: { children: ReactNode }) => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  const { data: currentUser, isLoading, isError } = useAuthQuery();

  // 프로필 설정이 되어있지 않으면 프로필 설정 페이지로 이동
  useEffect(() => {
    if (
      pathname !== LINK.PROFILE_SETUP_PAGE &&
      currentUser &&
      (!currentUser?.user_nickname || !currentUser?.user_image_url)
    ) {
      navigate(LINK.PROFILE_SETUP_PAGE);
    }
  }, [currentUser, navigate, pathname]);

  // 로그인이 되어있지 않으면 로그인 페이지로 이동
  useEffect(() => {
    if (currentUser === null && !isLoading && !isError) {
      navigate(LINK.AUTH_PAGE);
    }
  }, [currentUser, isLoading, isError, navigate]);

  // 로그인이 되어있지 않고 허용되지 않은 페이지로 접근하면 null 반환
  if (
    currentUser === null &&
    !ALLOWED_LINK.includes(window.location.pathname)
  ) {
    return null;
  }

  // 로그인 데이터 패치 실패 시 토큰 삭제 후 에러 페이지 이동
  if (isError) {
    removeTokenInStore();
    // 추후에 에러페이지 만들면 에러페이지로 이동
    return <div>에러삐비빕</div>;
  }

  return <>{children}</>;
};

export default AuthCheck;
