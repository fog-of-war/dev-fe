/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useFunnel } from "../../hooks/useFunnel";

import SetupNickName from "../../components/Auth/SetupNickName";
import SetupProfileImage from "../../components/Auth/SetupProfileImage";
import { setUpProfile } from "../../api/user";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface ProfileData {
  user_nickname: string;
  user_image_url: string;
}

const ProfileSetupPage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    user_nickname: "",
    user_image_url: "/images/auth/defaultProfile.png",
  });

  const navigate = useNavigate();

  const [Funnel, Step, setStep] = useFunnel("닉네임");

  const handleSubmit = async () => {
    try {
      await setUpProfile(profileData);
      toast.success("가입이 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      css={{
        padding: "0 20px",
        height: "100%",
        width: "100%",
      }}
    >
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
    </div>
  );
};

export default ProfileSetupPage;
