/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import colors from "../../constants/colors";
import B2 from "../UI/B2";
import TimeAgo from "./TimeAgo";

interface Notification {
  place_id: number;
  place_name: string;
  post_id: number;
  post_image_url: string;
  region_name: string;
  post_created_at: string;
}

const socketUrl = process.env.REACT_APP_SOCKET_URL as string;
const socket = io(socketUrl);

const NoticeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // 웹 소켓 연결 시
    socket.on("connect", () => {
      console.log("웹 소켓 서버 연결 성공");
    });

    // 웹 소켓으로부터 데이터를 받을 때
    socket.on("receive_post_alert", (data) => {
      console.log("받은 데이터:", data);

      // 데이터가 message 내부에 있는지 확인 후 추출
      const messageData = data.message;

      if (messageData) {
        // message 내부의 데이터를 Notification 객체와 일치하도록 변환
        const newNotification: Notification = {
          place_id: messageData.place_id,
          place_name: messageData.place_name,
          post_id: messageData.post_id,
          post_image_url: messageData.post_image_url,
          region_name: messageData.region_name,
          post_created_at: messageData.post_created_at,
        };

        // 변환된 알림을 알림 배열에 추가
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
      }
    });

    return () => {
      // 컴포넌트 언마운트 시, 웹 소켓 이벤트 리스너 해제
      socket.off("receive_post_alert");
    };
  }, []);

  // 'x' 아이콘 클릭 시, 해당 알림 삭제
  const handleDeleteClick = (notificationId: number) => {
    console.log("지워!");
  };

  return (
    <div>
      <hr css={{ width: "100%", border: `0.5px solid ${colors.paleGrey}` }} />
      {notifications.map((notification) => (
        <div
          key={notification.post_id}
          css={{
            display: "flex",
            alignItems: "center",
            padding: 15,
            borderBottom: `1px solid ${colors.paleGrey}`,
          }}
        >
          <div
            css={{
              width: "70px",
              height: "70px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              display: "inline-block",
              marginRight: "10px",
              border: `0.5px solid #EDEDED`,
            }}
          >
            <img
              src={notification.post_image_url}
              alt="장소 이미지"
              css={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
          <div css={{ flex: 1 }}>
            <B2
              css={{ color: colors.mediumGrey, fontWeight: 600, fontSize: 15 }}
            >
              {notification.region_name}에 탐험 장소가 추가되었어요
            </B2>
            <br />
            <B2 css={{ color: colors.mediumGrey, fontWeight: 400 }}>
              <span style={{ color: colors.primary, fontWeight: 600 }}>
                {notification.place_name}
              </span>
              를 만나보세요
            </B2>
            <br />
            <TimeAgo timestamp={notification.post_created_at} />
          </div>
          <img
            src="images/xIcon.png"
            alt="삭제 아이콘"
            onClick={() => handleDeleteClick(notification.post_id)}
            css={{
              cursor: "pointer",
              width: 12,
              marginLeft: "auto",
              marginBottom: "55px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NoticeNotifications;
