/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useFunnel } from "../../hooks/useFunnel";
import { toast } from "react-hot-toast";
import { LINK } from "../../constants/links";
import { setUpProfile } from "../../api/user";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../constants/images";
import { useMutation, useQueryClient } from "react-query";
import { UserData } from "../../types/types";
import { QUERY_KEY } from "../../react-query/queryKey";

import SetupNickName from "./SetupNickName";
import SetupProfileImage from "./SetupProfileImage";
import useAuth from "../../hooks/useAuth";

export interface ProfileSetupData {
  user_nickname: string;
  user_image_url: string;
}

/** OAuth 가입 후 필요한 프로필 데이터를 셋업하는 페이지 컴포넌트 */
const ProfileSetupComponent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: currentUser, updateCurrentUser } = useAuth();

  // 프로필 설정 페이지들을 관리하는 퍼널 커스텀훅
  const [Funnel, Step, setStep] = useFunnel("닉네임");

  // 프로필 설정 데이터
  const [profileData, setProfileData] = useState<ProfileSetupData>({
    user_nickname: "",
    user_image_url: DEFAULT_PROFILE_IMAGE_URL,
  });

  // 프로필 설정 데이터를 서버에 전송하는 뮤테이션
  const mutation = useMutation(
    async (profileData: ProfileSetupData) => {
      await setUpProfile(profileData);
    },
    {
      onSuccess: async () => {
        // 현재 유저 데이터를 새로운 데이터로 옵티미스틱 업데이트
        const newCurrentUserData: UserData = {
          ...currentUser!,
          user_nickname: profileData.user_nickname,
          user_image_url: profileData.user_image_url,
        };
        updateCurrentUser(newCurrentUserData);

        // 새로운 유저 데이터를 쿼리 캐시에 업데이트
        queryClient.invalidateQueries(QUERY_KEY.CURRENT_USER);
        toast.success("가입이 완료되었습니다.");
        navigate(LINK.HOME_PAGE);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  // 프로필 설정 데이터를 서버에 전송하는 함수
  const handleSubmit = async () => {
    mutation.mutate(profileData);
  };

  return (
    <ProfileSetupLayout>
      <Funnel>
        <Step name="닉네임">
          <SetupNickName
            onNext={() => setStep("프로필사진")}
            setProfileData={setProfileData}
            profileData={profileData}
          />
        </Step>
        <Step name="프로필사진">
          <SetupProfileImage
            onNext={handleSubmit}
            onPrev={() => setStep("닉네임")}
            setProfileData={setProfileData}
            profileData={profileData}
          />
        </Step>
      </Funnel>
    </ProfileSetupLayout>
  );
};

export default ProfileSetupComponent;

const ProfileSetupLayout = styled.div`
  padding: 0 20px;
  height: 100%;
  width: 100%;
`;
