/** @jsxImportSource @emotion/react */

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthQuery from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import ProfileEditHeader from "../components/EditProfile/ProfileEditHeader";
import EditProfileImage from "../components/EditProfile/EditProfileImage";
import EditProfileNickName from "../components/EditProfile/EditNickName";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "../react-query/queryKey";
import { getCurrentUser } from "../api/auth";
import { LINK } from "../constants/links";
import { editProfile, setUpProfile } from "../api/user";
import TitleDropdown from "../components/EditProfile/TitleDropdown";

export interface EditProfileData {
  user_nickname: string;
  user_image_url: string;
  user_selected_badge:any;
}

const ProfileEditPage = () => {
  const { data: userData } = useAuthQuery();
  console.log("userData:", userData);

  /** 칭호변경용 state */
  const userBadges = userData?.user_badges || [];
  const titles = userBadges.map((badge) => badge.badge_name);
  const defaultTitle = userData?.user_selected_badge.badge_name || "";
  const [selectedTitle, setSelectedTitle] = useState<string>(defaultTitle); // 선택된 칭호 상태
  const handleTitleChange = (newTitle: string) => {
    setSelectedTitle(newTitle);
  };

  /**-----------------*/
  const [editProfileData, setEditProfileData] = useState<EditProfileData>({
    user_nickname: userData?.user_nickname || "",
    user_image_url: userData?.user_image_url || "",
    user_selected_badge:userData?.user_selected_badge|| ""
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

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

  const mutation = useMutation(
    async (editProfileData: EditProfileData) => {
      await editProfile(editProfileData);
    },
    {
      onSuccess: async (data) => {
        // 현재 유저 데이터를 새로운 데이터로 옵티미스틱 업데이트
        const currentUser = await getCurrentUser();
        const newCurrentUserData = {
          ...currentUser,
          user_nickname: editProfileData.user_nickname,
          user_image_url: editProfileData.user_image_url,
          user_selected_badge:editProfileData.user_selected_badge
        };
        console.log("newCurrentUserData",newCurrentUserData)
        queryClient.setQueryData(QUERY_KEY.CURRENT_USER, newCurrentUserData);

        // 새로운 유저 데이터를 쿼리 캐시에 업데이트
        queryClient.invalidateQueries(QUERY_KEY.CURRENT_USER);
        toast.success("수정이 완료되었습니다.");
        navigate(LINK.MY_PAGE);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = () => {
    if (!validateNickName(editProfileData.user_nickname)) {
      return; // 유효성 검사에 실패하면 나머지 코드 실행 X
    }

    mutation.mutate(editProfileData);
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

      {userData && (
        <>
          <EditProfileImage
            profileData={editProfileData}
            setEditProfileData={setEditProfileData}
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />

          <EditProfileNickName
            profileData={editProfileData}
            setEditProfileData={setEditProfileData}
            inputRef={nickNameInputRef}
          />
          <TitleDropdown
              titles={titles}
              selectedTitle={selectedTitle}
              onSelectTitle={handleTitleChange} 
              setEditProfileData={setEditProfileData}
              // defaultTitle={defaultTitle}             
         />
        </>
      )}
    </div>
  );
};

export default ProfileEditPage;
