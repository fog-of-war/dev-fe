/** @jsxImportSource @emotion/react */

import React from "react";
import colors from "../../constants/colors";
import B2 from "../UI/B2";
import B3 from "../UI/B3";

const imageUrl = "images/dummyUserImage.png";

const ActivityNotifications = () => {
  const notifications = [
    {
      id: 1,
      username: "닉네임1",
      content: "여기 탕후루 짱맛인뎅",
      timestamp: "1시간전",
    },
    {
      id: 2,
      username: "닉네임2",
      content: "다른 내용",
      timestamp: "2시간전",
    },
    {
      id: 3,
      username: "닉네임3",
      content: "다른 내용",
      timestamp: "2시간전",
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
          key={notification.id}
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
              css={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div css={{ flex: 1 }}>
            <B2 css={{ color: colors.mediumGrey, fontWeight: 600 }}>
              <span style={{ color: colors.primary }}>
                {notification.username}
              </span>
              님이 댓글을 남겼어요
            </B2>
            <br />
            <B3 css={{ color: colors.mediumGrey, fontWeight: 400 }}>
              {notification.content}{" "}
              <span style={{ color: colors.lightGrey }}>
                {notification.timestamp}
              </span>
            </B3>
          </div>
          <img
            src="images/xIcon.png"
            alt="삭제 아이콘"
            onClick={() => handleDeleteClick(notification.id)}
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
