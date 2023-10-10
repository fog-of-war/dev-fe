/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import colors from "../../constants/colors";
import B2 from "../UI/B2";
import TimeAgo from "./TimeAgo";

import { getCookie, getUserId } from "./utils"; // 필요한 함수를 utils 폴더로 분리
import { Notification, Activity } from "./types"; // 타입을 types 폴더로 분리

/**
 *
 * 웹소켓 연결 설정 부분
 * 웹소켓 연결 시 user_id 와 access_token 이 필요합니다.
 *
 * */
const socketUrl = process.env.REACT_APP_SOCKET_URL as string;

const accessToken = localStorage.getItem("accessToken");
const sanitizedToken = accessToken ? accessToken.replace(/"/g, "") : undefined; // 브라우저의 로컬스토리지에서 accessToken 취득

const currentUserString = localStorage.getItem("currentUser"); // 브라우저의 로컬스토리지에서 currentUser 취득
const userId = getUserId(currentUserString); // currentUser 에서 user_id 취득

// const accessToken = getCookie("access_token"); // deprecated : 브라우저의 쿠키저장소에서 access_token 취득

/** -------------------- */

const NoticeNotifications = () => {
  /**
   *
   * State
   *
   * notifications: 공지알림(새로운 장소 추가시),
   * activities : 활동알림(댓글)
   *
   * */
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    let socket: any = null;

    if (currentUserString && accessToken) {
      try {
        socket = io(socketUrl + "-" + userId, {
          withCredentials: true,
          extraHeaders: {
            Authorization: `Bearer ${sanitizedToken}`,
          },
        });

        socket.on("connect", () => {
          console.log("웹 소켓 서버 연결 성공");
        });
        /**
         *
         * notification: 웹소켓의 공지알림 이벤트 구독,
         *
         * */
        socket.on("notification", (data: any) => {
          console.log("받은 공지 알림:", data);
          const messageData = data.message;
          if (messageData) {
            const newNotification: Notification = {
              place_id: messageData.place_id,
              place_name: messageData.place_name,
              post_id: messageData.post_id,
              post_image_url: messageData.post_image_url,
              region_name: messageData.region_name,
              post_created_at: messageData.post_created_at,
            };
            setNotifications((prevNotifications) => [
              newNotification,
              ...prevNotifications,
            ]);
          }
        });

        /**
         *
         * activity: 웹소켓의 활동알림 이벤트 구독,
         *
         * */
        socket.on("activity", (data: any) => {
          console.log("받은 활동알림:", data);
          const messageData = data.message;
          if (messageData) {
            const newNotification: any = {
              alerted_user_id: messageData.alerted_user_id,
              comment_created_at: messageData.comment_created_at,
              comment_id: messageData.comment_id,
              comment_text: messageData.comment_text,
              user_image_url: messageData.user_image_url,
              user_nickname: messageData.user_nickname,
            };
            setActivities((prevNotifications) => [
              newNotification,
              ...prevNotifications,
            ]);
          }
        });

        return () => {
          // 컴포넌트 언마운트 시, 웹 소켓 이벤트 리스너 해제
          socket.off("notification");
          socket.off("activity");
        };
      } catch (error) {
        console.error("WebSocket 연결 중 오류 발생:", error);
        // 예외 처리 코드 추가
      }
    }
  }, []);
  // 'x' 아이콘 클릭 시, 해당 알림 삭제
  const handleDeleteClick = (notificationId: number) => {
    console.log("지워!");
  };

  return (
    <div>
      <hr css={{ width: "100%", border: `0.5px solid ${colors.paleGrey}` }} />
      {notifications.length === 0 ? ( // 알림이 없을 때
        <div
          css={{
            display: "flex",
            alignItems: "center",
            padding: 15,
            borderBottom: `1px solid ${colors.paleGrey}`,
          }}
        >
          <img
            src="images/explorerIcon.png"
            alt="아이콘"
            css={{
              width: 70,
              height: 70,
              marginRight: 10,
            }}
          />
          <div css={{ flex: 1 }}>
            <B2
              css={{
                color: colors.mediumGrey,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              새로운 알림이 없습니다.
            </B2>
          </div>
        </div>
      ) : (
        notifications.map((notification) => (
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
                css={{
                  color: colors.mediumGrey,
                  fontWeight: 600,
                  fontSize: 15,
                }}
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
        ))
      )}
    </div>
  );
};

export default NoticeNotifications;
