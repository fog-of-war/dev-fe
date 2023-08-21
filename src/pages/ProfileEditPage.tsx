/** @jsxImportSource @emotion/react */

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProfileEditHeader from "../components/EditProfile/ProfileEditHeader";
import EditProfileImage from "../components/EditProfile/EditProfileImage";
import EditProfileNickName from "../components/EditProfile/EditNickName";

const DUMMY_USER = {
  nickName: "여러분과함께라면행복",
  profileImage: "/images/dummyUserImage.png",
};

export interface EditProfileData {
  nickName: string;
  profileImage: string;
}

const ProfileEditPage = () => {
  const [editProfileData, setEditProfileData] = useState<EditProfileData>({
    nickName: DUMMY_USER.nickName,
    profileImage: DUMMY_USER.profileImage,
  });

  const navigate = useNavigate();

  const nickNameInputRef = useRef<HTMLInputElement>(null);

  const validateNickName = (nickName: string) => {
    if (nickName.trim().length === 0) {
      toast.error("닉네임을 입력해주세요.");
      nickNameInputRef.current?.focus();
      return false;
    }
    if (nickName.length > 10) {
      toast.error("닉네임은 10자 이하로 입력해주세요.");
      nickNameInputRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = () => {
    if (!validateNickName(editProfileData.nickName)) {
      return; // 유효성 검사에 실패하면 나머지 코드 실행 X
    }

    console.log(editProfileData);
  };

  return (
    <div
      css={{
        padding: "80px 20px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "36px",
      }}
    >
      <ProfileEditHeader
        onBackClick={handleBackClick}
        onCompleteClick={handleCompleteClick}
      />

      <EditProfileImage
        profileData={DUMMY_USER}
        setEditProfileData={setEditProfileData}
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <EditProfileNickName
        profileData={DUMMY_USER}
        setEditProfileData={setEditProfileData}
        inputRef={nickNameInputRef}
      />
    </div>
  );
};

export default ProfileEditPage;
