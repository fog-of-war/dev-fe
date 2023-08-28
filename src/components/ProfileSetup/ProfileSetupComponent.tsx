/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useFunnel } from "../../hooks/useFunnel";
import { toast } from "react-hot-toast";
import { LINK } from "../../constants/links";
import { setUpProfile } from "../../api/user";

import SetupNickName from "./SetupNickName";
import SetupProfileImage from "./SetupProfileImage";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../constants/images";
import { ProfileSetupData } from "../../types/types";

const ProfileSetupComponent = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileSetupData>({
    user_nickname: "",
    user_image_url: DEFAULT_PROFILE_IMAGE_URL,
  });

  const [Funnel, Step, setStep] = useFunnel("닉네임");

  const handleSubmit = async () => {
    try {
      await setUpProfile(profileData);
      toast.success("가입이 완료되었습니다.");
      navigate(LINK.HOME_PAGE);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
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
