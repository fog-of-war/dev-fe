/** @jsxImportSource @emotion/react */

import { ChangeEvent, useRef, useState } from "react";
import { ProfileData } from "../../pages/auth/ProfileSetupPage";
import uploadImage from "../../api/aws";
import styled from "@emotion/styled";
import colors from "../../constants/colors";

import SetupProfileForm from "./SetupProfileForm";
import Title from "../Title";
import Button from "../UI/Button";
import SetupProfileHeader from "./SetupProfileHeader";

interface SetupProfileImageProps {
  onNext: () => void;
  onPrev: () => void;
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const SetupProfileImage = ({
  onNext,
  onPrev,
  profileData,
  setProfileData,
}: SetupProfileImageProps) => {
  const [profileImage, setProfileImage] = useState(
    profileData.profileImage || "/images/default_profile_image.png"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const response = await uploadImage(file);
        const imageUrl = response.imageUrl;

        setProfileImage(imageUrl);
        setProfileData({ ...profileData, profileImage: imageUrl });
      } catch (error: any) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <SetupProfileForm>
      <SetupProfileHeader onClick={onPrev} />
      <SetupProfileImageWrapper>
        <Title text="프로필 사진을 설정해주세요" size="large" />
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="profile_image" />
          <EditImageButton onClick={() => fileInputRef?.current?.click()}>
            <span>편집</span>
            <ProfileImageInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </EditImageButton>
        </ProfileImageWrapper>
      </SetupProfileImageWrapper>
      <Button onClick={onNext}>프로필 설정 완료</Button>
    </SetupProfileForm>
  );
};

export default SetupProfileImage;

const SetupProfileImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

const EditImageButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  height: 32px;
  width: 100%;
  background: #444;
  color: #fff;
  padding-bottom: 3px;
  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 127px;
  height: 127px;
  overflow: hidden;
  border-radius: 9999px;
  background: ${colors.tertiary};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImageInput = styled.input`
  display: none;
`;
