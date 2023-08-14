/** @jsxImportSource @emotion/react */

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ProfileData } from "../../pages/auth/ProfileSetupPage";

import BottomLinedInput from "../UI/BottomLinedInput";
import Button from "../UI/Button";
import SetupProfileForm from "./SetupProfileForm";
import Title from "../Title";
import SetupProfileHeader from "./SetupProfileHeader";
import { useNavigate } from "react-router-dom";

interface SetupNickNameProps {
  onNext: () => void;
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const SetupNickName = ({
  onNext,
  profileData,
  setProfileData,
}: SetupNickNameProps) => {
  const [nickName, setNickName] = useState(profileData.nickName);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

    setProfileData((prev) => ({ ...prev, nickName }));
    onNext();
  };

  return (
    <SetupProfileForm>
      <SetupProfileHeader onClick={() => navigate(-1)} />
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
