/** @jsxImportSource @emotion/react */

import { ChangeEvent, useRef, useState } from "react";
import { EditProfileData } from "../../pages/ProfileEditPage";
import styled from "@emotion/styled";
import colors from "../../constants/colors";
import uploadImage from "../../api/aws";

interface EditProfileImageProps {
  profileData: EditProfileData;
  setEditProfileData: React.Dispatch<React.SetStateAction<EditProfileData>>;
}

const EditProfileImage = ({
  profileData,
  setEditProfileData,
}: EditProfileImageProps) => {
  const [profileImage, setProfileImage] = useState(
    profileData.user_image_url || "/images/default_profile_image.png"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const imageUrl = await uploadImage(file);

        setProfileImage(imageUrl);
        setEditProfileData({ ...profileData, user_image_url: imageUrl });
      } catch (error: any) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
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
  );
};

export default EditProfileImage;

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
