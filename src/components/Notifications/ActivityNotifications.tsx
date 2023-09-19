/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import B2 from "../UI/B2";
import B3 from "../UI/B3";

const imageUrl = "images/dummyUserImage.png";

const ActivityNotifications = () => {
  return (
    <div css={{ display: "flex", alignItems: "center", padding: 15 }}>
      <div
        css={{
          width: "42px",
          height: "42px",
          backgroundColor: "#ccc",
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "10px",
        }}
      >
        <img
          src={imageUrl}
          alt="프로필 이미지"
          css={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div>
        <B2 css={{ color: colors.mediumGrey, fontWeight: 600 }}>
          <span style={{ color: colors.primary }}>닉네임</span>님이 댓글을
          남겼어요
        </B2>
        <br />
        <B3 css={{ color: colors.mediumGrey, fontWeight: 400 }}>
          여기 탕후루 짱맛인뎅{" "}
          <span style={{ color: colors.lightGrey }}>1시간전</span>
        </B3>
      </div>
    </div>
  );
};

export default ActivityNotifications;
