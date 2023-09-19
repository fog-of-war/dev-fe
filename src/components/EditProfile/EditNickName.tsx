/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { EditProfileData } from "../../pages/ProfileEditPage";
import BottomLinedInput from "../UI/BottomLinedInput";
import colors from "../../constants/colors";

interface EditNickNameProps {
  profileData: EditProfileData;
  setEditProfileData: React.Dispatch<React.SetStateAction<EditProfileData>>;
  inputRef: React.RefObject<HTMLInputElement>;
}

const EditNickName = ({
  profileData,
  setEditProfileData,
  inputRef,
}: EditNickNameProps) => {
  const [nickName, setNickName] = useState<string | undefined>(
    profileData.user_nickname
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      css={{
        width: "100%",
      }}
    >
      <span
        css={{
          fontSize: "16px",
          fontWeight: "bold",
          color: colors.accent,
        }}
      >
        닉네임
      </span>
      <BottomLinedInput
        value={nickName}
        onChange={(e) => {
          setNickName(e.target.value);
          setEditProfileData((prev) => ({
            ...prev,
            user_nickname: e.target.value,
          }));
        }}
        ref={inputRef}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        resetFiled={() => setNickName("")}
      />
    </div>
  );
};

export default EditNickName;
