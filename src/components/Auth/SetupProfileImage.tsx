/** @jsxImportSource @emotion/react */

import { ChangeEvent, useRef, useState } from "react";
import { ProfileData } from "../../pages/auth/ProfileSetupPage";

import SetupProfileForm from "./SetupProfileForm";
import Title from "../Title";
import Button from "../UI/Button";
import SetupProfileHeader from "./SetupProfileHeader";
import uploadImage from "../../api/aws";
import colors from "../../constants/colors";

interface SetupProfileImageProps {
  onNext: () => void;
  onPrev: () => void;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const SetupProfileImage = ({
  onNext,
  onPrev,
  setProfileData,
}: SetupProfileImageProps) => {
  const [profileImage, setProfileImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNextStep = () => {
    setProfileData((prev) => ({ ...prev, profileImage }));
    onNext();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const response = await uploadImage(file);
        const imageUrl = response.imageUrl;

        setProfileImage(imageUrl);
      } catch (error: any) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <SetupProfileForm>
      <SetupProfileHeader onClick={onPrev} />
      <div
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
        }}
      >
        <Title text="프로필 사진을 설정해주세요." size="large" />
        <div
          css={{
            position: "relative",
            width: "127px",
            height: "127px",
            overflow: "hidden",
            borderRadius: "9999px",
            background: colors.tertiary,
          }}
        >
          <img
            src={profileImage || "/images/auth/defaultProfile.png"}
            alt="profile_image"
            css={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <div
            css={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bottom: 0,
              height: "32px",
              width: "100%",
              background: "#444",
              color: `#fff`,
              paddingBottom: "3px",
            }}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            <span>편집</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              css={{
                display: "none",
              }}
            />
          </div>
        </div>
      </div>
      <Button onClick={handleNextStep}>프로필 설정 완료</Button>
    </SetupProfileForm>
  );
};

export default SetupProfileImage;
