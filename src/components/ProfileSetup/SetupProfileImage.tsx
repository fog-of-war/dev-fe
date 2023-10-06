/** @jsxImportSource @emotion/react */

import { ChangeEvent, useRef, useState } from "react";
import uploadImage from "../../api/aws";
import styled from "@emotion/styled";
import colors from "../../constants/colors";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../constants/images";
import { toast } from "react-hot-toast";
import { ProfileSetupData } from "./ProfileSetupComponent";

import SetupProfileForm from "./SetupProfileForm";
import Title from "../Title";
import Button from "../UI/Button";
import SetupProfileHeader from "./SetupProfileHeader";

interface SetupProfileImageProps {
  onNext: () => void;
  onPrev: () => void;
  profileData: ProfileSetupData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileSetupData>>;
}

const SetupProfileImage = ({
  onNext,
  onPrev,
  profileData,
  setProfileData,
}: SetupProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState(
    profileData.user_image_url || DEFAULT_PROFILE_IMAGE_URL
  );

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const imageUrl = await uploadImage(file);

        setProfileImage(imageUrl);
        setProfileData({ ...profileData, user_image_url: imageUrl });
      } catch (error: any) {
        toast.error(error.response.data.message);
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
      <Button
        onClick={onNext}
        size="large"
        css={{
          width: "100%",
          height: "55px",
        }}
      >
        프로필 설정 완료
      </Button>
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
  background: ${colors.pastel};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImageInput = styled.input`
  display: none;
`;
