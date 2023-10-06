/** @jsxImportSource @emotion/react */

import BackButton from "../UI/BackButton";
import colors from "../../constants/colors";

interface ProfileEditHeaderProps {
  onBackClick: () => void;
  onCompleteClick: () => void;
}

const ProfileEditHeader = ({
  onBackClick,
  onCompleteClick,
}: ProfileEditHeaderProps) => {
  return (
    <div
      css={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        top: "20px",
        left: "20px",
        height: "40px",
        boxSizing: "border-box",
        overflow: "hidden",
        width: "calc(100% - 40px)",
      }}
    >
      <BackButton onClick={onBackClick} />
      <span
        css={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "17px",
          fontWeight: "600",
          color: colors.darkGrey,
          marginBottom: "3px",
        }}
      >
        프로필 수정
      </span>
      <div onClick={onCompleteClick}>
        <img
          src="/images/completeButton.png"
          alt="complete_button"
          css={{
            position: "absolute",
            right: "0",
            top: "10px",
            width: "25px",
            height: "17px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>
    </div>
  );
};

export default ProfileEditHeader;
