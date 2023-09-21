/** @jsxImportSource @emotion/react */

import React from "react";
import colors from "../../constants/colors";
import B2 from "../UI/B2";
import B3 from "../UI/B3";

interface Notification {
  user_nickname: string;
  user_image_url: string;
  comment_id: number;
  comment_text: string;
  comment_created_at: string;
}

const imageUrl = "images/dummyUserImage.png";

const ActivityNotifications = () => {
  const notifications = [
    {
      comment_id: 1,
      user_nickname: "모두다차차차",
      comment_text: "여기 탕후루 짱맛인뎅",
      comment_created_at: "1시간전",
    },
    {
      comment_id: 2,
      user_nickname: "다함께차차차",
      comment_text:
        "안녕하세요 글자테스트입니다. 이거는스무자가넘는문자입니다.",
      comment_created_at: "2시간전",
    },
    {
      comment_id: 3,
      user_nickname: "갯마을차차차",
      comment_text: "여기 탕후루 짱맛인뎅",
      comment_created_at: "3일전",
    },
  ];

  // 'x' 아이콘 클릭 시, 해당 알림 삭제
  const handleDeleteClick = (notificationId: number) => {
    console.log("지워!");
  };

  return (
    <div>
      <hr css={{ width: "100%", border: `0.5px solid ${colors.paleGrey}` }} />
      {notifications.map((notification) => (
        <div
          key={notification.comment_id}
          css={{
            display: "flex",
            alignItems: "center",
            padding: 15,
            borderBottom: `1px solid ${colors.paleGrey}`,
          }}
        >
          <div
            css={{
              width: "42px",
              height: "42px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "10px",
              border: `0.5px solid #EDEDED`,
            }}
          >
            <img
              src={imageUrl}
              alt="프로필 이미지"
              css={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <div css={{ flex: 1 }}>
            <B2 css={{ color: colors.mediumGrey, fontWeight: 600 }}>
              <span style={{ color: colors.primary }}>
                {notification.user_nickname}
              </span>
              님이 댓글을 남겼어요
            </B2>
            <br />
            <B3 css={{ color: colors.mediumGrey, fontWeight: 400 }}>
              {notification.comment_text.length > 20
                ? `${notification.comment_text.slice(0, 20)}...`
                : notification.comment_text}{" "}
              <span style={{ color: colors.lightGrey }}>
                {notification.comment_created_at}
              </span>
            </B3>
          </div>
          <img
            src="images/xIcon.png"
            alt="삭제 아이콘"
            onClick={() => handleDeleteClick(notification.comment_id)}
            css={{
              cursor: "pointer",
              width: 12,
              marginLeft: "auto",
              marginBottom: "35px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ActivityNotifications;
