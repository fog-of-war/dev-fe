import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LINK } from "../../../constants/links";
import { useQueryClient } from "react-query";
import { getCurrentUser, oAuthLogin } from "../../../api/auth";
import { setDataToLocalStorage } from "../../../utils/localStorage";
import { STORAGE_KEY } from "../../../constants/storage";

const useOAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /** OAuth 버튼 클릭 핸들러 */
  const handleClickOAuthButton = (e: React.MouseEvent<HTMLDivElement>) => {
    const oAuthName = e.currentTarget.id;
    console.log(
      "🚀 ~ file: AuthPage.tsx:25 ~ handleClickOAuthButton ~ oAuthName:",
      `${process.env.REACT_APP_API_URL}v1/auth/${oAuthName}`
    );

    // OAuth 제공자의 로그인 페이지로 리다이렉션
    window.location.href = `${process.env.REACT_APP_API_URL}v1/auth/${oAuthName}`;
  };

  const handleAuthentication = async (code: string, oAuthName: string) => {
    try {
      // 액세스 토큰을 받아 로컬 스토리지에 저장
      const { access_token: accessToken, refresh_token: refreshToken } =
        await oAuthLogin(code, oAuthName);

      setDataToLocalStorage(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      setDataToLocalStorage(STORAGE_KEY.REFRESH_TOKEN, refreshToken);

      // 유저정보 요청 및 유저 캐시 업데이트
      const currentUser = await getCurrentUser();
      queryClient.setQueryData(["currentUser"], currentUser);

      // 유저 프로필 셋없이 안돼있으면 프로필 셋업 페이지로 이동 아니면 메인페이지로 이동
      if (
        currentUser &&
        (!currentUser?.user_nickname || !currentUser?.user_image_url)
      ) {
        navigate(LINK.PROFILE_SETUP_PAGE);
      } else {
        navigate(LINK.HOME_PAGE);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    // URL 쿼리 파라미터에서 코드를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // 현재 URL에서 OAuth 제공자 이름을 필터링
    const currentUrl = window.location.href;
    const oAuthNames = ["google", "kakao", "naver"].filter((oAuthName) =>
      currentUrl.includes(oAuthName)
    );

    if (code && oAuthNames.length > 0) {
      const oAuthName = oAuthNames[0]; // 첫 번째로 매칭된 OAuth 제공자 이름 사용
      handleAuthentication(code, oAuthName);
    }
  }, []);

  return handleClickOAuthButton;
};

export default useOAuth;
