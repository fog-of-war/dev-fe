/** @jsxImportSource @emotion/react */

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { removeTokenInStore } from "../../api/auth";
import { ProfileSetupData } from "./ProfileSetupComponent";

import BottomLinedInput from "../UI/BottomLinedInput";
import Button from "../UI/Button";
import SetupProfileForm from "./SetupProfileForm";
import Title from "../Title";
import SetupProfileHeader from "./SetupProfileHeader";

interface SetupNickNameProps {
  onNext: () => void;
  profileData: ProfileSetupData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileSetupData>>;
}

const SetupNickName = ({
  onNext,
  profileData,
  setProfileData,
}: SetupNickNameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [nickName, setNickName] = useState(profileData.user_nickname);
  const [isFocused, setIsFocused] = useState(false);

  const validateNickName = (nickName: string) => {
    if (nickName.trim().length === 0) {
      toast.error("닉네임을 입력해주세요.");
      inputRef.current?.focus();
      return false;
    }
    if (nickName.length >= 10) {
      toast.error("닉네임은 10자 이하로 입력해주세요.");
      inputRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (!validateNickName(nickName)) return;

    setProfileData((prev) => ({ ...prev, user_nickname: nickName }));
    onNext();
  };

  return (
    <SetupProfileForm>
      <SetupProfileHeader
        onClick={() => {
          if (window.confirm("프로필 설정을 취소하시겠습니까?")) {
            removeTokenInStore();
            navigate("/");
          }
        }}
      />
      <div
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
        }}
      >
        <Title text="닉네임을 입력해주세요" size="large" />
        <BottomLinedInput
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          ref={inputRef}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          resetFiled={() => setNickName("")}
        />
      </div>
      <Button
        onClick={handleNextStep}
        size="large"
        css={{
          width: "100%",
          height: "55px",
        }}
      >
        다음
      </Button>
    </SetupProfileForm>
  );
};

export default SetupNickName;
