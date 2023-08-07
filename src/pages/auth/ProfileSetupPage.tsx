/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useFunnel } from "../../hooks/useFunnel";

import SetupNickName from "../../components/Auth/SetupNickName";
import SetupProfileImage from "../../components/Auth/SetupProfileImage";

export interface ProfileData {
  nickName: string;
  profileImage: string;
}

const ProfileSetupPage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickName: "",
    profileImage: "/images/auth/defaultProfile.png",
  });

  const [Funnel, Step, setStep] = useFunnel("닉네임");

  const handleSubmit = () => {
    console.log(profileData);
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
